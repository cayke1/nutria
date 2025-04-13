import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, parse } from "date-fns";
import { Clock } from "lucide-react";
import { Meal, MealType, mealTypeLabels } from "@/@types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/lib/contexts/auth-context";
import { DateInput, KcalInput } from "../helpers/InputMask";
import { stringToDate } from "@/lib/utils/stringToDate";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  description: z
    .string()
    .min(5, { message: "Descrição deve ter pelo menos 5 caracteres" }),
  calories: z
    .number()
    .min(1, { message: "Calorias deve ser um número positivo" }),
  date: z.string(),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Formato inválido. Use HH:MM",
  }),
  type: z.enum(["breakfast", "lunch", "snack", "dinner"]),
});

type FormValues = z.infer<typeof formSchema>;

interface MealFormProps {
  meal?: Meal;
  onSubmit: (meal: Omit<Meal, "_id">) => void;
  onCancel: () => void;
  repeat?: boolean;
}

export function MealForm({ meal, onSubmit, onCancel, repeat }: MealFormProps) {
  const { user } = useAuth();

  const [date, setDate] = useState<Date | undefined>(
    meal ? new Date(meal.dateTime) : undefined
  );

  const defaultValues: FormValues = {
    name: meal?.name || "",
    description: meal?.description || "",
    calories: meal?.calories || 0,
    date: meal
      ? format(new Date(meal.dateTime), "dd/MM/yyyy")
      : format(new Date(), "dd/MM/yyyy"),
    time: meal?.dateTime
      ? format(meal.dateTime, "HH:mm")
      : format(new Date(), "HH:mm"),
    type: meal?.type || "breakfast",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    try {
      const [hours, minutes] = values.time.split(":").map(Number);
      const dateTime = stringToDate(values.date);
      dateTime.setHours(hours, minutes);

      onSubmit({
        name: values.name,
        description: values.description,
        calories: values.calories,
        dateTime: dateTime.toISOString(),
        type: values.type,
        userId: user!._id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      toast.success(meal ? "Refeição atualizada" : "Refeição adicionada", {
        description: `${values.name} foi ${meal ? "atualizada" : "adicionada"} com sucesso.`,
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar a refeição.");
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome da refeição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva sua refeição"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="calories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calorias</FormLabel>
              <FormControl>
                <KcalInput
                  placeholder="0"
                  value={field.value.toString()}
                  onChange={(value) => {
                    const parsedValue = parseInt(value.replace(/\D/g, ""), 10);
                    field.onChange(isNaN(parsedValue) ? 0 : parsedValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="text-lg font-semibold text-gray-800">
          Data e hora da refeição
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <DateInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Hora</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="HH:MM" {...field} />
                  </FormControl>
                  <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Refeição</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de refeição" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(Object.keys(mealTypeLabels) as MealType[]).map((type) => (
                    <SelectItem key={type} value={type}>
                      {mealTypeLabels[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-nutria-500 hover:bg-nutria-600">
            {meal ? (repeat ? "Re-cadastrar" : "Atualizar") : "Adicionar"}{" "}
            Refeição
          </Button>
        </div>
      </form>
    </Form>
  );
}

// src/components/TransactionForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars*/
"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Account, Category } from "@/types";
import { formatCurrency } from "@/lib/format";

// Schema de validação com Zod
const transactionSchema = z.object({
  description: z.string().min(3, "Descrição deve ter pelo menos 3 caracteres"),
  amount: z
    .number({
      required_error: "Valor é obrigatório",
      invalid_type_error: "Valor deve ser um número",
    })
    .refine((value) => value !== 0, "Valor não pode ser zero"),
  date: z.date({
    required_error: "Data é obrigatória",
    invalid_type_error: "Data inválida",
  }),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  accountId: z.string().min(1, "Conta é obrigatória"),
  notes: z.string().optional(),
  isRecurring: z.boolean().default(false),
  attachments: z.array(z.string()).optional(),
});

// Tipo derivado do schema
type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  // Para edição, pode-se passar os dados existentes
  initialData?: Partial<TransactionFormData>;
  // Listas de contas e categorias para os selects
  accounts: Account[];
  categories: Category[];
  // Callbacks
  onSubmit: (data: TransactionFormData) => Promise<void> | void;
  onCancel: () => void;
  // Modo do formulário
  mode?: "create" | "edit";
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  initialData,
  accounts,
  categories,
  onSubmit,
  onCancel,
  mode = "create",
}) => {
  // Estado para controlar se a transação é receita ou despesa
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    initialData?.amount && initialData.amount > 0 ? "income" : "expense"
  );

  // Estado para controlar a visibilidade de opções avançadas
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Hook do React Hook Form com validação do Zod
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: initialData?.description || "",
      amount: initialData?.amount ? Math.abs(initialData.amount) : undefined,
      date: initialData?.date || new Date(),
      categoryId: initialData?.categoryId || "",
      accountId:
        initialData?.accountId || (accounts.length > 0 ? accounts[0].id : ""),
      notes: initialData?.notes || "",
      isRecurring: initialData?.isRecurring || false,
      attachments: initialData?.attachments || [],
    },
  });

  // Função que prepara os dados antes do envio
  const processSubmit = (data: TransactionFormData) => {
    // Ajusta o valor para negativo se for despesa
    if (transactionType === "expense") {
      data.amount = -Math.abs(data.amount);
    } else {
      data.amount = Math.abs(data.amount);
    }

    onSubmit(data);
  };

  // Filtrar categorias relevantes com base no tipo de transação
  const filteredCategories = categories.filter((category) => {
    // Aqui você pode implementar a lógica para filtrar categorias por tipo
    // Por exemplo, talvez você tenha um campo 'type' na categoria que indica se é para receita ou despesa
    return category.name.toLowerCase().includes(transactionType);
  });

  return (
    <div className="bg-nextjs-white rounded-nextjs border border-nextjs-gray-2 shadow-nextjs-small">
      <div className="p-6 border-b border-nextjs-gray-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-nextjs-black">
          {mode === "create" ? "Nova Transação" : "Editar Transação"}
        </h2>
        <button
          onClick={onCancel}
          className="text-nextjs-gray-4 hover:text-nextjs-black"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit(processSubmit)}>
        <div className="p-6 space-y-6">
          {/* Tipo de transação (Receita/Despesa) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-nextjs-gray-4">
              Tipo de Transação
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-nextjs border ${
                  transactionType === "income"
                    ? "bg-income/10 border-income text-income"
                    : "border-nextjs-gray-2 hover:bg-nextjs-gray-1"
                }`}
                onClick={() => setTransactionType("income")}
              >
                Receita
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-nextjs border ${
                  transactionType === "expense"
                    ? "bg-expense/10 border-expense text-expense"
                    : "border-nextjs-gray-2 hover:bg-nextjs-gray-1"
                }`}
                onClick={() => setTransactionType("expense")}
              >
                Despesa
              </button>
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-nextjs-gray-4"
            >
              Descrição
            </label>
            <input
              id="description"
              type="text"
              className={`w-full px-3 py-2 border rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light ${
                errors.description ? "border-expense" : "border-nextjs-gray-2"
              }`}
              placeholder="Ex: Supermercado, Salário, etc."
              {...register("description")}
            />
            {errors.description && (
              <p className="text-expense text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Valor */}
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-nextjs-gray-4"
            >
              Valor
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-nextjs-gray-4">
                R$
              </span>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    className={`w-full pl-8 pr-3 py-2 border rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light ${
                      errors.amount ? "border-expense" : "border-nextjs-gray-2"
                    }`}
                    placeholder="0,00"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        ? parseFloat(e.target.value)
                        : undefined;
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </div>
            {errors.amount && (
              <p className="text-expense text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Data */}
          <div className="space-y-2">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-nextjs-gray-4"
            >
              Data
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input
                  id="date"
                  type="date"
                  className={`w-full px-3 py-2 border rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light ${
                    errors.date ? "border-expense" : "border-nextjs-gray-2"
                  }`}
                  {...field}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    field.onChange(
                      e.target.value ? new Date(e.target.value) : undefined
                    );
                  }}
                />
              )}
            />
            {errors.date && (
              <p className="text-expense text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Conta */}
          <div className="space-y-2">
            <label
              htmlFor="accountId"
              className="block text-sm font-medium text-nextjs-gray-4"
            >
              Conta
            </label>
            <select
              id="accountId"
              className={`w-full px-3 py-2 border rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light ${
                errors.accountId ? "border-expense" : "border-nextjs-gray-2"
              }`}
              {...register("accountId")}
            >
              <option value="">Selecione uma conta</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name} ({formatCurrency(account.balance)})
                </option>
              ))}
            </select>
            {errors.accountId && (
              <p className="text-expense text-sm mt-1">
                {errors.accountId.message}
              </p>
            )}
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-nextjs-gray-4"
            >
              Categoria
            </label>
            <select
              id="categoryId"
              className={`w-full px-3 py-2 border rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light ${
                errors.categoryId ? "border-expense" : "border-nextjs-gray-2"
              }`}
              {...register("categoryId")}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-expense text-sm mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Opções avançadas toggle */}
          <div>
            <button
              type="button"
              className="text-nextjs-blue hover:text-nextjs-blue-light text-sm font-medium transition-colors flex items-center"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? "Ocultar" : "Mostrar"} opções avançadas
              <span className="ml-1">{showAdvanced ? "▲" : "▼"}</span>
            </button>
          </div>

          {/* Opções avançadas */}
          {showAdvanced && (
            <div className="space-y-6 pt-2">
              {/* Notas */}
              <div className="space-y-2">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-nextjs-gray-4"
                >
                  Observações
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  className="w-full px-3 py-2 border border-nextjs-gray-2 rounded-nextjs focus:outline-none focus:ring-2 focus:ring-nextjs-blue-light"
                  placeholder="Adicione observações sobre esta transação..."
                  {...register("notes")}
                />
              </div>

              {/* Transação recorrente */}
              <div className="flex items-center">
                <input
                  id="isRecurring"
                  type="checkbox"
                  className="h-4 w-4 border-nextjs-gray-2 rounded text-nextjs-blue focus:ring-nextjs-blue-light"
                  {...register("isRecurring")}
                />
                <label
                  htmlFor="isRecurring"
                  className="ml-2 block text-sm text-nextjs-gray-4"
                >
                  Esta é uma transação recorrente
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Botões de ação */}
        <div className="p-6 border-t border-nextjs-gray-2 bg-nextjs-gray-1 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-nextjs-gray-2 rounded-nextjs hover:bg-nextjs-gray-2 transition-colors"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-nextjs-blue text-white rounded-nextjs hover:bg-nextjs-blue-light transition-colors shadow-nextjs-small"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Salvando..."
              : mode === "create"
              ? "Adicionar"
              : "Salvar alterações"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;

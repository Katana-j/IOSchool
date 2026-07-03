"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  name: z.string().min(1, { message: "Class name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity is required!" }),
  grade: z.coerce.number().min(1, { message: "Grade is required!" }),
  supervisor: z.string().min(1, { message: "Supervisor is required!" }),
});

type Inputs = z.infer<typeof schema>;

const ClassForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) as any });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold text-gray-800">
        {type === "create" ? "Create New Class" : "Update Class"}
      </h1>
      <div className="bg-lamaSkyLight rounded-xl p-4 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-lamaSky uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-lamaSky rounded-full inline-block" />
          Class Information
        </h2>
        <div className="flex justify-between flex-wrap gap-4">
          <InputField
            label="Class Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors?.name}
          />
          <InputField
            label="Capacity"
            name="capacity"
            type="number"
            defaultValue={data?.capacity}
            register={register}
            error={errors?.capacity}
          />
          <InputField
            label="Grade"
            name="grade"
            type="number"
            defaultValue={data?.grade}
            register={register}
            error={errors?.grade}
          />
          <InputField
            label="Supervisor"
            name="supervisor"
            defaultValue={data?.supervisor}
            register={register}
            error={errors?.supervisor}
          />
        </div>
      </div>
      <button className="bg-lamaSky hover:bg-lamaSkyLight hover:text-lamaSky border border-lamaSky text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 mt-2">
        {type === "create" ? "Create Class" : "Update Class"}
      </button>
    </form>
  );
};

export default ClassForm;

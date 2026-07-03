"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  name: z.string().min(1, { message: "Subject name is required!" }),
});

type Inputs = z.infer<typeof schema>;

const SubjectForm = ({
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
  } = useForm<Inputs>({ resolver: zodResolver(schema) });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold text-gray-800">
        {type === "create" ? "Create New Subject" : "Update Subject"}
      </h1>
      <div className="bg-lamaYellowLight rounded-xl p-4 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-lamaYellow uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-lamaYellow rounded-full inline-block" />
          Subject Information
        </h2>
        <div className="flex justify-between flex-wrap gap-4">
          <InputField
            label="Subject Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors?.name}
          />
        </div>
      </div>
      <button className="bg-lamaYellow hover:bg-lamaYellowLight hover:text-lamaYellow border border-lamaYellow text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 mt-2">
        {type === "create" ? "Create Subject" : "Update Subject"}
      </button>
    </form>
  );
};

export default SubjectForm;

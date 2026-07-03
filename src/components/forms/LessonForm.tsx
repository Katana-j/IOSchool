"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  subject: z.string().min(1, { message: "Subject is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  teacher: z.string().min(1, { message: "Teacher is required!" }),
});

type Inputs = z.infer<typeof schema>;

const LessonForm = ({
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
        {type === "create" ? "Create New Lesson" : "Update Lesson"}
      </h1>
      <div className="bg-lamaSkyLight rounded-xl p-4 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-lamaSky uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-lamaSky rounded-full inline-block" />
          Lesson Information
        </h2>
        <div className="flex justify-between flex-wrap gap-4">
          <InputField
            label="Subject"
            name="subject"
            defaultValue={data?.subject}
            register={register}
            error={errors?.subject}
          />
          <InputField
            label="Class"
            name="class"
            defaultValue={data?.class}
            register={register}
            error={errors?.class}
          />
          <InputField
            label="Teacher"
            name="teacher"
            defaultValue={data?.teacher}
            register={register}
            error={errors?.teacher}
          />
        </div>
      </div>
      <button className="bg-lamaSky hover:bg-lamaSkyLight hover:text-lamaSky border border-lamaSky text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 mt-2">
        {type === "create" ? "Create Lesson" : "Update Lesson"}
      </button>
    </form>
  );
};

export default LessonForm;

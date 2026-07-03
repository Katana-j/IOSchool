"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  subject: z.string().min(1, { message: "Subject is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  teacher: z.string().min(1, { message: "Teacher is required!" }),
  date: z.string().min(1, { message: "Date is required!" }),
});

type Inputs = z.infer<typeof schema>;

const ExamForm = ({
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
        {type === "create" ? "Create New Exam" : "Update Exam"}
      </h1>
      <div className="bg-lamaPurpleLight rounded-xl p-4 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-lamaPurple uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-lamaPurple rounded-full inline-block" />
          Exam Information
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
          <InputField
            label="Date"
            name="date"
            type="date"
            defaultValue={data?.date}
            register={register}
            error={errors?.date}
          />
        </div>
      </div>
      <button className="bg-lamaPurple hover:bg-lamaPurpleLight hover:text-lamaPurple border border-lamaPurple text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 mt-2">
        {type === "create" ? "Create Exam" : "Update Exam"}
      </button>
    </form>
  );
};

export default ExamForm;

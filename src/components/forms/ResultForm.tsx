"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  subject: z.string().min(1, { message: "Subject is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  teacher: z.string().min(1, { message: "Teacher is required!" }),
  student: z.string().min(1, { message: "Student is required!" }),
  date: z.string().min(1, { message: "Date is required!" }),
  type: z.enum(["exam", "assignment"], { message: "Type is required!" }),
  score: z.coerce
    .number()
    .min(0)
    .max(100, { message: "Score must be between 0 and 100!" }),
});

type Inputs = z.infer<typeof schema>;

const ResultForm = ({
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
        {type === "create" ? "Create New Result" : "Update Result"}
      </h1>
      <div className="bg-lamaPurpleLight rounded-xl p-4 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-lamaPurple uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-lamaPurple rounded-full inline-block" />
          Result Information
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
            label="Student"
            name="student"
            defaultValue={data?.student}
            register={register}
            error={errors?.student}
          />
          <InputField
            label="Date"
            name="date"
            type="date"
            defaultValue={data?.date}
            register={register}
            error={errors?.date}
          />
          <InputField
            label="Score"
            name="score"
            type="number"
            defaultValue={data?.score}
            register={register}
            error={errors?.score}
          />
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500 font-medium">Type</label>
            <select
              {...register("type")}
              defaultValue={data?.type}
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-white focus:ring-lamaPurple outline-none"
            >
              <option value="">Select type</option>
              <option value="exam">Exam</option>
              <option value="assignment">Assignment</option>
            </select>
            {errors?.type?.message && (
              <p className="text-xs text-red-400">
                {errors.type.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>
      <button className="bg-lamaPurple hover:bg-lamaPurpleLight hover:text-lamaPurple border border-lamaPurple text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 mt-2">
        {type === "create" ? "Create Result" : "Update Result"}
      </button>
    </form>
  );
};

export default ResultForm;

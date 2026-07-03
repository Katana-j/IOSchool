"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  student: z.string().min(1, { message: "Student is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  date: z.string().min(1, { message: "Date is required!" }),
  present: z.enum(["true", "false"], {
    message: "Attendance status is required!",
  }),
});

type Inputs = z.infer<typeof schema>;

const AttendanceForm = ({
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
        {type === "create"
          ? "Create Attendance Record"
          : "Update Attendance Record"}
      </h1>
      <div className="bg-lamaSkyLight rounded-xl p-4 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-lamaSky uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-lamaSky rounded-full inline-block" />
          Attendance Information
        </h2>
        <div className="flex justify-between flex-wrap gap-4">
          <InputField
            label="Student"
            name="student"
            defaultValue={data?.student}
            register={register}
            error={errors?.student}
          />
          <InputField
            label="Class"
            name="class"
            defaultValue={data?.class}
            register={register}
            error={errors?.class}
          />
          <InputField
            label="Date"
            name="date"
            type="date"
            defaultValue={data?.date}
            register={register}
            error={errors?.date}
          />
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500 font-medium">Status</label>
            <select
              {...register("present")}
              defaultValue={data?.present}
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-white focus:ring-lamaSky outline-none"
            >
              <option value="">Select status</option>
              <option value="true">Present</option>
              <option value="false">Absent</option>
            </select>
            {errors?.present?.message && (
              <p className="text-xs text-red-400">
                {errors.present.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>
      <button className="bg-lamaSky hover:bg-lamaSkyLight hover:text-lamaSky border border-lamaSky text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 mt-2">
        {type === "create" ? "Create Record" : "Update Record"}
      </button>
    </form>
  );
};

export default AttendanceForm;

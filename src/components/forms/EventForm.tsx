"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  date: z.string().min(1, { message: "Date is required!" }),
  startTime: z.string().min(1, { message: "Start time is required!" }),
  endTime: z.string().min(1, { message: "End time is required!" }),
});

type Inputs = z.infer<typeof schema>;

const EventForm = ({
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
        {type === "create" ? "Create New Event" : "Update Event"}
      </h1>
      <div className="bg-lamaYellowLight rounded-xl p-4 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-lamaYellow uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-lamaYellow rounded-full inline-block" />
          Event Information
        </h2>
        <div className="flex justify-between flex-wrap gap-4">
          <InputField
            label="Title"
            name="title"
            defaultValue={data?.title}
            register={register}
            error={errors?.title}
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
          <InputField
            label="Start Time"
            name="startTime"
            type="time"
            defaultValue={data?.startTime}
            register={register}
            error={errors?.startTime}
          />
          <InputField
            label="End Time"
            name="endTime"
            type="time"
            defaultValue={data?.endTime}
            register={register}
            error={errors?.endTime}
          />
        </div>
      </div>
      <button className="bg-lamaYellow hover:bg-lamaYellowLight hover:text-lamaYellow border border-lamaYellow text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 mt-2">
        {type === "create" ? "Create Event" : "Update Event"}
      </button>
    </form>
  );
};

export default EventForm;

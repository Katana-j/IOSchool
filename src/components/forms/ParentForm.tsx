"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
});

type Inputs = z.infer<typeof schema>;

const ParentForm = ({
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
        {type === "create" ? "Create New Parent" : "Update Parent"}
      </h1>
      <div className="bg-lamaSkyLight rounded-xl p-4 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-lamaSky uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-lamaSky rounded-full inline-block" />
          Parent Information
        </h2>
        <div className="flex justify-between flex-wrap gap-4">
          <InputField
            label="Name"
            name="name"
            defaultValue={data?.name}
            register={register}
            error={errors?.name}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            defaultValue={data?.email}
            register={register}
            error={errors?.email}
          />
          <InputField
            label="Phone"
            name="phone"
            defaultValue={data?.phone}
            register={register}
            error={errors?.phone}
          />
          <InputField
            label="Address"
            name="address"
            defaultValue={data?.address}
            register={register}
            error={errors?.address}
          />
        </div>
      </div>
      <button className="bg-lamaSky hover:bg-lamaSkyLight hover:text-lamaSky border border-lamaSky text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 mt-2">
        {type === "create" ? "Create Parent" : "Update Parent"}
      </button>
    </form>
  );
};

export default ParentForm;

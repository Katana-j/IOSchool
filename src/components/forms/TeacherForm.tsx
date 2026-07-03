"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood type is required!" }),
  birthday: z.date({ message: "Date of birth is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required!" }),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
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
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold text-gray-800">
        {type === "create" ? "Create New Teacher" : "Update Teacher"}
      </h1>

      {/* AUTHENTICATION INFO */}
      <div className="bg-lamaSkyLight rounded-xl p-4 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-lamaSky uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-lamaSky rounded-full inline-block" />
          Authentication Information
        </h2>
        <div className="flex justify-between flex-wrap gap-4">
          <InputField
            label="Username"
            name="username"
            defaultValue={data?.username}
            register={register}
            error={errors?.username}
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
            label="Password"
            name="password"
            type="password"
            defaultValue={data?.password}
            register={register}
            error={errors?.password}
          />
        </div>
      </div>

      {/* PERSONAL INFO */}
      <div className="bg-lamaPurpleLight rounded-xl p-4 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-lamaPurple uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-4 bg-lamaPurple rounded-full inline-block" />
          Personal Information
        </h2>
        <div className="flex justify-between flex-wrap gap-4">
          <InputField
            label="First Name"
            name="firstName"
            defaultValue={data?.firstName}
            register={register}
            error={errors?.firstName}
          />
          <InputField
            label="Last Name"
            name="lastName"
            defaultValue={data?.lastName}
            register={register}
            error={errors?.lastName}
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
          <InputField
            label="Blood Type"
            name="bloodType"
            defaultValue={data?.bloodType}
            register={register}
            error={errors?.bloodType}
          />
          <InputField
            label="Date of Birth"
            name="birthday"
            type="date"
            defaultValue={data?.birthday}
            register={register}
            error={errors?.birthday}
          />
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500 font-medium">Sex</label>
            <select
              {...register("sex")}
              defaultValue={data?.sex}
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-white focus:ring-lamaPurple outline-none"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors?.sex?.message && (
              <p className="text-xs text-red-400">
                {errors.sex.message.toString()}
              </p>
            )}
          </div>

          {/* UPLOAD PHOTO */}
          <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
            <label
              className="text-xs text-gray-500 font-medium flex items-center gap-2 cursor-pointer border-2 border-dashed border-lamaPurple rounded-md p-3 hover:bg-lamaPurpleLight transition"
              htmlFor="img"
            >
              <Image src="/upload.png" alt="" width={24} height={24} />
              <span>Upload a photo</span>
            </label>
            <input
              id="img"
              type="file"
              {...register("img")}
              className="hidden"
            />
            {errors?.img?.message && (
              <p className="text-xs text-red-400">
                {errors.img.message.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SUBMIT */}
      <button className="bg-lamaSky hover:bg-lamaSkyLight hover:text-lamaSky border border-lamaSky text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 mt-2">
        {type === "create" ? "Create Teacher" : "Update Teacher"}
      </button>
    </form>
  );
};

export default TeacherForm;

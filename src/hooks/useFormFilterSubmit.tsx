import { useRouter, useSearchParams } from "next/navigation";

const useFormFilterSubmit = (targetPath: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSubmit = (formData: FormData) => {
    const paramsClone = new URLSearchParams(searchParams.toString());
    for (const [key, value] of formData.entries()) {
      paramsClone.set(key, value as string);
    }
    console.log(paramsClone.toString());
    router.push(`${targetPath}?${paramsClone.toString()}`);
  };

  return handleSubmit;
};

export default useFormFilterSubmit;

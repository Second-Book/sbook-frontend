import { useRouter, useSearchParams } from "next/navigation";

const useFormFilterSubmit = (targetPath: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSubmit = (data: FormData | { [key: string]: string }) => {
    const paramsClone = new URLSearchParams(searchParams.toString());
    const entries =
      data instanceof FormData ? data.entries() : Object.entries(data);
    for (const [key, value] of entries) {
      if (value && value !== "all") {
        paramsClone.set(key, value as string);
      } else {
        paramsClone.delete(key);
      }
    }
    router.push(`${targetPath}?${paramsClone.toString()}`);
  };

  return handleSubmit;
};

export default useFormFilterSubmit;

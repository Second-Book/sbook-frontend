import type { Metadata } from "next";
import NewTextbookForm from '@/components/NewTextbookForm'

export const metadata: Metadata = {
  title: "Dodaj novi udžbenik",
};

const NewTextbook = () => {
  return (
    <div className="flex flex-col items-center py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dodaj novi udžbenik</h1>
      <NewTextbookForm />
    </div>
  )
}

export default NewTextbook
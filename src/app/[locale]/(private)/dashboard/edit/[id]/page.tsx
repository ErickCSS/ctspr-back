import { EditEmployeePage } from "@modules/Dashboard/features/edit/EditEmployeePage";

export default async function EditEmployee({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditEmployeePage employeeId={id} />;
}

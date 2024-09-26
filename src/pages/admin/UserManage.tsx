import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useCheckLoginQuery } from "@/redux/api/auth/authApi";
import { useDeleteUserMutation, useGetAllUserQuery, usePromoteUserMutation } from "@/redux/api/user/userApi";
import { CustomError } from "@/types/errorType";

const UserManage = () => {
  const { data: userData } = useCheckLoginQuery(undefined);
  const { data, isLoading, isError, error } = useGetAllUserQuery(
    userData?.data?.token
  );

  const [deleteUser, {isLoading: userDeleteLoading, isError: isUserDeleteError, error: userDeleteError}] = useDeleteUserMutation(userData?.data?.token);
  const [promoteUser, {isLoading: userPromoteLoading, isError: isUserPromoteError, error: userPromoteError}] = usePromoteUserMutation(userData?.data?.token);

  const handleUserDelete = async (userId:string) => {
    const deletedUser = await deleteUser({userId, token: userData?.data?.token})
    if (deletedUser?.data?.success){
      toast({description: "User deleted successfully"})
    }
  }

  const handleUserPromote = async (userId:string) => {
    const promotedUser = await promoteUser({userId, token: userData?.data?.token})
    if (promotedUser?.data?.success){
      toast({description: "User Promoted successfully"})
    }
  }

  return (
    <>
      {isLoading && (
        <button type="button" className="bg-primary" disabled>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          Loading...
        </button>
      )}
      {isError && (
        <p className="text-red-500">{(error as CustomError)?.data?.message}</p>
      )}
      {userDeleteLoading && (
        <button type="button" className="bg-primary" disabled>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          Loading...
        </button>
      )}
      {isUserDeleteError && (
        <p className="text-red-500">{(userDeleteError as CustomError)?.data?.message}</p>
      )}
      {userPromoteLoading && (
        <button type="button" className="bg-primary" disabled>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          Loading...
        </button>
      )}
      {isUserPromoteError && (
        <p className="text-red-500">{(userPromoteError as CustomError)?.data?.message}</p>
      )}
      <div className="container">
        <h2 className="scroll-m-20 py-4 text-3xl font-semibold tracking-tight first:mt-0">
          User Management
        </h2>
        <div className="border rounded-md max-w-[600px]">
          <Table className="overflow-auto">
            <TableHeader className="">
              <TableRow>
                <TableHead className="bg-primary text-white rounded-ss-md">
                  User Name
                </TableHead>
                <TableHead className="bg-primary text-white">
                  User Email
                </TableHead>
                <TableHead className="bg-primary text-white">Role</TableHead>
                <TableHead className="bg-primary text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  {item.role === "user" && (
                    <TableCell className="flex">
                      <Button onClick={() => handleUserPromote(item._id)} className="bg-secondary text-white">
                        Promote
                      </Button>{" "}
                      /{" "}
                      <Button onClick={() => handleUserDelete(item._id)} className="bg-red-600 text-white">Delete</Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserManage;

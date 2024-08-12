"use client";
import { useRouter } from "next/navigation";
import { IUser } from "@/lib/helpers/interfaces";
import { useAppDispatch } from "@/lib/store/hooks";
import { editUser } from "@/lib/store/features/Users/userSlice";
import { deleteUser } from "@/lib/store/features/Users/fetchUsersApi";
import { toast } from "react-hot-toast";

const EditDeleteButtons = ({ users }: { users: IUser }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDelete = async (id: string) => {
    try {
      const toastID = toast.loading("Loading...")
      const resultAction = await dispatch(deleteUser(id));
      if (deleteUser.fulfilled.match(resultAction)) {
        toast.success("User Deleted Successfully", { id: toastID })
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user: IUser, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(editUser(user));
    router.push("/admin/updateuser");
  };

  return (
    <td className="md:w-24">
      <div className="flex flex-col gap-2 m-2">
        <button
          id={`deleteBtn-${users.username}`}
          onClick={() => handleDelete(users._id)}
          className="bg-slate-300 hover:bg-slate-400 hover:transition rounded-xl py-0.5 px-2 md:py-2 hover:shadow-md"
        >
          Delete
        </button>
        <button
          onClick={(e) => handleEdit(users, e)}
          id={`editBtn-${users.username}`}
          className="bg-slate-300 hover:bg-slate-400 hover:transition rounded-xl py-0.5 px-2 md:py-2 hover:shadow-md"
        >
          Edit
        </button>
      </div>
    </td>
  );
};

export default EditDeleteButtons;

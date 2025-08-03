"use client";
import React, { FormEventHandler, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Fetch from "@/services/noteservice";
import { cn } from "@/lib/utils";
import { IconDeviceFloppy, IconSelector } from "@tabler/icons-react";

interface Props {
  id: number;
  category: string;
  archive: boolean;
  text: string;
  updatedAt: string;
  refresh: () => void;
}

export default function Cards(props: Props) {
  const { category, archive, text, updatedAt, id, refresh } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [body, setBody] = useState(text);
  const [editText, setEditText] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const categoryColors: Record<
    string,
    {
      title: string;
      body: string;
      button: string;
      border: string;
      text: string;
    }
  > = {
    work: {
      title: "bg-blue-400",
      text: "text-blue-200",
      body: "bg-blue-200",
      button: "bg-blue-500 hover:bg-blue-600",
      border: "border-blue-400",
    },
    creativity: {
      title: "bg-rose-400",
      text: "text-rose-200",
      body: "bg-rose-200",
      button: "bg-rose-500 hover:bg-rose-600",
      border: "border-rose-400",
    },
    "daily life": {
      title: "bg-yellow-400",
      text: "text-yellow-200",
      body: "bg-yellow-200",
      button: "bg-yellow-500 hover:bg-yellow-600",
      border: "border-yellow-400",
    },
    health: {
      title: "bg-green-400",
      text: "text-green-200",
      body: "bg-green-200",
      button: "bg-green-500 hover:bg-green-600",
      border: "border-green-400",
    },
    miscellaneous: {
      title: "bg-orange-400",
      text: "text-orange-200",
      body: "bg-orange-200",
      button: "bg-orange-500 hover:bg-orange-600",
      border: "border-orange-400",
    },
  };

  const colors = categoryColors[category] ?? {
    title: "bg-neutral-400",
    text: "text-neutral-200",
    body: "bg-neutral-200",
    button: "bg-neutral-500 hover:bg-neutral-600",
    border: "border-neutral-400",
  };

  const titleColor = colors.title;
  const textColor = colors.text;
  const bodyColor = colors.body;
  const buttonColor = colors.button;
  const borderColor = colors.border;

  const handleDelete = async () => {
    await toast.promise(Fetch.deleteNotes(id), {
      loading: "Deleting note...",
      success: <b>Note successfully deleted</b>,
      error: <b>Failed to delete note</b>,
    });
    refresh();
  };
  const handleEdit = async () => {
    await toast.promise(Fetch.editNotes({ id: id, text: body }), {
      loading: "Updating note...",
      success: <b>Note updated successfully </b>,
      error: <b>Failed to update note</b>,
    });
    refresh();
  };
  const handleArchive = async () => {
    await toast.promise(Fetch.setArchived(id), {
      loading: archive ? "Restoring note..." : "Archiving note...",
      success: (
        <b>
          {archive
            ? "Note restored successfully"
            : "Note archived successfully"}
        </b>
      ),
      error: <b>Failed to update archive status</b>,
    });

    refresh();
  };
  const handleCategory = async (payload: string) => {
    await toast.promise(Fetch.editNotes({ id: id, category: payload }), {
      loading: "Updating category...",
      success: <b>Category updated successfully</b>,
      error: <b>Failed to update category</b>,
    });
    setOpenCategory(false);
    refresh();
  };

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = formData.get("category") as string;
    await handleCategory(payload);
  };

  useEffect(() => {
    setBody(text);
    refresh();
  }, [text]);

  return (
    <>
      <div
        className={cn(
          borderColor,
          "border-2 rounded h-64 w-full grid grid-cols-1 grid-rows-[1fr_3fr_1fr]"
        )}
      >
        <div
          className={cn(
            titleColor,
            "p-2 grid grid-rows-1 grid-cols-3 w-full h-full justify-between"
          )}
        >
          <div
            className={cn(
              textColor,
              "flex items-center pl-2 justify-center uppercase font-bold"
            )}
          >
            {category}
          </div>
          <div className="flex items-center text-white font-bold justify-center">
            {archive && "Archived"}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                className={cn(
                  buttonColor,
                  "h-9 px-4 py-2 w-full rounded flex gap-2 items-center justify-between text-white shadow-xs"
                )}
              >
                <div>Open</div>
                <IconSelector />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setEditText(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleArchive();
                }}
              >
                {archive ? "Unarchive" : "Archive"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenCategory(true)}>
                Change Category
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full h-full">
          <textarea
            className={cn(
              editText ? "bg-white" : bodyColor,
              " h-full text-black w-full cursor-text px-2 py-1 resize-none"
            )}
            value={body}
            disabled={!editText}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </div>
        {editText ? (
          <div className="w-full h-full flex justify-end items-center px-4">
            <button
              className="w-fit p-2 bg-green-500 text-white px-3 py-1 rounded text-sm flex gap-2 hover:bg-green-600"
              onClick={() => {
                handleEdit();
                setEditText(false);
              }}
            >
              <div className="font-bold">Save</div>
              <div className="w-full h-full">
                <IconDeviceFloppy />
              </div>
            </button>
          </div>
        ) : (
          <div
            className={cn(
              bodyColor,
              "flex  justify-center items-center text-black/50 w-full"
            )}
          >
            <div
              className={cn(
                textColor,
                "scale-90 w-full flex items-center justify-end"
              )}
            >
              <div>Modified:</div>
              <div className="p-2">{updatedAt}</div>
            </div>
          </div>
        )}
      </div>
      <AlertDialog onOpenChange={setOpenDelete} open={openDelete}>
        <AlertDialogContent className="border-0 ring-1 ring-red-500 bg-red-200 shadow-md shadow-red-500">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete note</AlertDialogTitle>
            <AlertDialogDescription className="text-black">
              This action cannot be undone. This will permanently delete from
              our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full justify-center flex items-center">
            <div className="flex gap-4">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  await handleDelete();
                }}
              >
                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={openCategory} onOpenChange={setOpenCategory}>
        <DialogContent className="sm:max-w-[425px] border-sidebar">
          <form onSubmit={submit} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle className="text-black">Edit Category</DialogTitle>
            </DialogHeader>
            <Select name="category">
              <SelectTrigger className="bg-white border-1 border-sidebar w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" "> - </SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="creativity">Creativity</SelectItem>
                <SelectItem value="daily life">Daily life</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
              </SelectContent>
            </Select>
            <DialogFooter className="w-full justify-center flex items-center">
              <div className="flex gap-4">
                <DialogClose asChild>
                  <Button className="text-black" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  className="w-fit p-2 bg-green-500 text-white px-3 py-1 rounded text-sm flex gap-2 hover:bg-green-600"
                  type="submit"
                >
                  Change category
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

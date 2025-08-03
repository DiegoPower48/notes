"use client";

import { FormEventHandler, useEffect, useState } from "react";
import Fetch from "../../services/noteservice";
import Cards from "@/components/cards";
import toast, { Toaster } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Notes {
  id: number;
  text: string;
  archive: boolean;
  category: string;
  updatedAt: string;
}

interface Payload {
  text: string;
  category: string;
}

export default function Page() {
  const [notes, setNotes] = useState<Notes[]>();
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const payload = {
        archive: status,
        category: category,
      };
      const data = await Fetch.getFilter(payload);
      setNotes(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const createNote = async (data: Payload) => {
    await toast.promise(Fetch.createNote(data), {
      loading: "Saving...",
      success: <b>Note created succesfully!</b>,
      error: <b>Error</b>,
    });
    setIsOpen(false);
  };

  useEffect(() => {
    loadData();
  }, [status, category]);

  const submit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      category: formData.get("category") as string,
      text: formData.get("text") as string,
    };
    await createNote(payload);
    await loadData();
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header authorized={true} />
      <div className="flex-1 w-full flex flex-col">
        {loading ? (
          <div className="text-white">loading...</div>
        ) : (
          <div className="flex flex-1 flex-col">
            <div className="w-full bg-yellow-200 p-4 flex gap-4 justify-center">
              <div className="p-4 gap-4 grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-3 justify-center">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <button className="col-span-2 md:col-span-1 h-9 px-4 py-2 border-yellow-700 border-1 rounded flex items-center justify-center text-white bg-sidebar  shadow-xs hover:bg-yellow-600 active:scale-105  duration-300 transition-all">
                      Create note
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] border-1 border-sidebar text-black">
                    <form onSubmit={submit} className="flex flex-col gap-4">
                      <DialogHeader className="pb-4">
                        <DialogTitle>New Note</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="name-1">Category:</Label>
                          <Select name="category">
                            <SelectTrigger className="bg-white w-32 border-1 border-sidebar">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value=" "> - </SelectItem>
                              <SelectItem value="work">Work</SelectItem>
                              <SelectItem value="creativity">
                                Creativity
                              </SelectItem>
                              <SelectItem value="daily life">
                                Daily life
                              </SelectItem>
                              <SelectItem value="health">Health</SelectItem>
                              <SelectItem value="miscellaneous">
                                Miscellaneous
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="text">Text:</Label>
                          <textarea
                            id="text"
                            className="resize-none bg-white border-1 border-sidebar rounded p-2"
                            rows={4}
                            name="text"
                          />
                        </div>
                      </div>
                      <DialogFooter className="w-full justify-center flex items-center">
                        <div className="flex gap-4">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button
                            className="bg-green-600 text-white hover:bg-green-700"
                            type="submit"
                          >
                            Create note
                          </Button>
                        </div>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Select onValueChange={setStatus} defaultValue={status}>
                  <SelectTrigger className="col bg-white w-32 border-black/50">
                    <SelectValue placeholder="status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=" "> - </SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setCategory} defaultValue={category}>
                  <SelectTrigger className="bg-white w-32 border-black/50">
                    <SelectValue placeholder="category" />
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
              </div>
            </div>
            <div className="w-full h-full flex justify-center flex-col items-center">
              {notes && notes.length > 0 ? (
                <div className="w-11/12  grid grid-cols-1 md:grid-cols-3 place-content-center grid-rows-auto gap-4 p-2">
                  {notes.map((e, i) => (
                    <Cards
                      key={i}
                      refresh={loadData}
                      id={e.id}
                      text={e.text}
                      archive={e.archive}
                      category={e.category}
                      updatedAt={new Date(e.updatedAt).toLocaleString()}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full h-20 text-white text-center flex items-center justify-center">
                  <div className="text-black/30 font-bold text-xl">
                    Not found
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <Footer />
    </div>
  );
}

"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconDoorEnter } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Fetch from "@/services/authservice";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = { email: email, password: password };
    try {
      await Fetch.login(payload);
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 5000);
    }
  }, [error]);

  return (
    <div className="h-screen flex flex-col justify-between items-center">
      <Header authorized={false} />
      <div className="w-full max-w-[500px] h-[400px] flex flex-col items-center justify-center shadow-2xl shadow-sidebar rounded-xl bg-white border-sidebar border-1 text-primary-foreground p-8">
        <form
          onSubmit={submit}
          className="h-full w-full grid grid-rows-[1fr_auto_3fr_1fr] items-center justify-center gap-2"
        >
          <div className="w-full flex flex-col justify-center gap-2">
            <p className="text-3xl font-bold">Login</p>
            <p className="text-sm">Please enter your email and password.</p>
          </div>
          <div className="h-4">
            {error && (
              <p
                className="text-red-500 font-bold"
                style={{ textShadow: "1px 1px 4px  #fb2c36" }}
              >
                {error}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="username">Email</Label>
              <Input
                name="email"
                type="email"
                className="w-full"
                id="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                className="w-full"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            className="bg-sidebar text-primary-foreground hover:bg-accent hover:text-accent-foreground shadow-lg shadow-indigo-500/50 flex gap-4 transition-all duration-300 transfor"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="text-white">Logging in...</div>
                <div className="w-4 h-4 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              </>
            ) : (
              <>
                <p className="text-white">Login</p>
                <IconDoorEnter className="text-white" />
              </>
            )}
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

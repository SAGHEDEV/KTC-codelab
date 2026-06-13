import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Mock auth</p>
      <h1 className="mt-2 text-3xl font-semibold text-black">Sign in locally</h1>
      <p className="mt-2 text-sm text-gray-700">
        This MVP uses local state only, so sign-in is a simple placeholder and keeps you inside the workspace.
      </p>
      <div className="mt-6 space-y-4">
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <Link href="/crunch">
          <Button className="w-full">Continue to dashboard</Button>
        </Link>
      </div>
      <p className="mt-4 text-sm text-gray-700">
        No account yet? <Link className="text-black font-semibold" href="/signup">Create one</Link>
      </p>
    </Card>
  );
}

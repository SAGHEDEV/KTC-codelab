import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Mock onboarding</p>
      <h1 className="mt-2 text-3xl font-semibold text-black">Create your workspace</h1>
      <div className="mt-6 space-y-4">
        <Input placeholder="Full name" />
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <Link href="/onboarding">
          <Button className="w-full">Create account</Button>
        </Link>
      </div>
      <p className="mt-4 text-sm text-gray-700">
        Already have access? <Link className="text-black font-semibold" href="/login">Sign in</Link>
      </p>
    </Card>
  );
}

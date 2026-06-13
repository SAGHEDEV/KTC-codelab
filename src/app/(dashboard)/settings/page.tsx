"use client";

import { UpgradePrompt } from "@/components/shared/upgrade-prompt";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/app-store";

export default function SettingsPage() {
  const profile = useAppStore.getState().profile;

  return (
    <div className="space-y-6">
      <Card>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-600">Settings</p>
        <h1 className="mt-2 text-2xl font-semibold text-black">Profile and preferences</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] bg-black/8 border border-black/15 p-4">
            <p className="text-sm text-gray-600">Name</p>
            <p className="mt-1 text-black">{profile.name}</p>
          </div>
          <div className="rounded-[24px] bg-black/8 border border-black/15 p-4">
            <p className="text-sm text-gray-600">Level</p>
            <p className="mt-1 text-black">{profile.level}</p>
          </div>
          <div className="rounded-[24px] bg-black/8 border border-black/15 p-4">
            <p className="text-sm text-gray-600">Institution</p>
            <p className="mt-1 text-black">{profile.institution}</p>
          </div>
          <div className="rounded-[24px] bg-black/8 border border-black/15 p-4">
            <p className="text-sm text-gray-600">Country</p>
            <p className="mt-1 text-black">{profile.country}</p>
          </div>
        </div>
      </Card>
      <UpgradePrompt />
    </div>
  );
}

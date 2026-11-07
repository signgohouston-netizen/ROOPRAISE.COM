import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Account Deletion Policy" };

export default function AccountDeletionPage() {
  return (
    <LegalPage
      title="Account Deletion Policy"
      intro="You can ask to delete your Roopraise account and associated personal data at any time. This page explains how to request deletion and what happens to your data."
      sections={[
        {
          h: "How to request deletion",
          p: [
            "Email support@roopraise.com from the address on your account with the subject “Delete my account”, or use the delete option in your account settings when available.",
            "To protect your account, we may ask you to verify your identity before processing the request.",
          ],
        },
        {
          h: "What gets deleted",
          p: [
            "Your profile, store, listings and personal contact details are removed from public view and scheduled for deletion from our active systems, typically within 30 days of a verified request.",
          ],
        },
        {
          h: "What we may keep",
          p: [
            "We may retain limited information where the law requires it or for legitimate business needs — for example, transaction and tax records, fraud-prevention logs, and records needed to resolve an open dispute. Retained data is kept only as long as necessary and is then deleted or anonymised.",
            "Messages and order records involving another party may be retained in that party’s account as needed to document their own transactions.",
          ],
        },
        {
          h: "Before you delete",
          p: [
            "Deletion is permanent and cannot be undone. Settle any open orders, disputes or payouts first. Once deleted, your store, listings, ratings and history cannot be restored.",
          ],
        },
      ]}
    />
  );
}

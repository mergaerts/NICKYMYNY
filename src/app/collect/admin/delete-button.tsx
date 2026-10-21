"use client";

export function DeleteButton({ email }: { email: string }) {
  return (
    <form
      action="/api/collect/admin/delete"
      method="post"
      onSubmit={(e) => {
        if (!confirm(`Remove ${email} from the collector list?`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="email" value={email} />
      <button type="submit" className="text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-destructive">
        Remove
      </button>
    </form>
  );
}

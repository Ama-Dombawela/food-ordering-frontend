import { Button, Card, Badge } from "../ui";
import type { UserDTO } from "../../types";

interface AdminUserCardProps {
  user: UserDTO;
  onDelete: (id: number) => void;
}

// Admin user row card used in the users table layout.
export default function AdminUserCard({ user, onDelete }: AdminUserCardProps) {
  return (
    <Card className="flex items-center justify-between gap-4">
      {/* Present the user identity first, then the role and action. */}
      <div>
        <h3 className="text-lg font-semibold text-white">{user.name}</h3>
        <p className="text-sm text-teal-200/70">{user.email}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="blue">{user.role}</Badge>
        <Button type="button" variant="danger" onClick={() => onDelete(user.id)}>Delete</Button>
      </div>
    </Card>
  );
}

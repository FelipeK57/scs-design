import { User } from "@heroui/react";

export const Header = () => {
  return (
    <nav className="flex justify-end border-b border-b-divider w-full p-4">
      <User
        avatarProps={{
          src: `https://ui-avatars.com/api/?name=John+Doe&?background=random`,
        }}
        name="John Doe"
        description="Administrator"
      />
    </nav>
  );
};

import { Button } from "@heroui/react";

export const ReadxPresentation = () => {
  return (
    <main className="grid place-content-center gap-6 h-full">
      <img src="/Readx Icon.svg" alt="ReaDx Logo" className="w-32 mx-auto"/>
      <h1 className="text-2xl font-bold text-center">Welcome to Readx SPA</h1>
      <Button color="secondary" variant="shadow">Click Me</Button>
    </main>
  );
};

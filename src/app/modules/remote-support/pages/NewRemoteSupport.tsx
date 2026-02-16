import {
  Button,
  DatePicker,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useState } from "react";
import { Link } from "react-router";

export const NewRemoteSupport = () => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedTechnician, setSelectedTechnician] = useState<string | null>(
    null,
  );
  const [issueType, setIssueType] = useState<string | null>(null);
  const [requesterName, setRequesterName] = useState("");
  const [requesterEmail, setRequesterEmail] = useState("");
  const [requesterPhone, setRequesterPhone] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [solutionApplied, setSolutionApplied] = useState("");
  const [duration, setDuration] = useState("");

  // Mock de clientes
  const clients = [
    { id: "client1", nombre: "Empresa A" },
    { id: "client2", nombre: "Empresa B" },
    { id: "client3", nombre: "Empresa C" },
    { id: "client4", nombre: "Empresa D" },
    { id: "client5", nombre: "Empresa E" },
  ];

  // Mock de técnicos
  const technicians = [
    { id: "tech1", nombre: "Juan Pérez" },
    { id: "tech2", nombre: "María Gómez" },
    { id: "tech3", nombre: "Carlos López" },
    { id: "tech4", nombre: "Ana Martínez" },
    { id: "tech5", nombre: "Luis Rodríguez" },
  ];

  // Tipos de problemas
  const issueTypes = [
    { value: "soporte-tecnico", label: "Soporte Técnico" },
    { value: "configuracion", label: "Configuración" },
    { value: "mantenimiento", label: "Mantenimiento" },
    { value: "resolucion-problemas", label: "Resolución de Problemas" },
    { value: "capacitacion", label: "Capacitación" },
  ];

  return (
    <main className="flex flex-col gap-8">
      {/* Header Section */}
      <article className="flex flex-col items-start gap-4">
        <Link to="/remote-support" className="text-xs border-b">
          Volver
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Nueva Atención Remota
          </h1>
          <p className="text-sm text-default-500">
            Registra una nueva sesión de soporte remoto
          </p>
        </div>
      </article>

      {/* Basic Information Card */}
      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">1. Información básica</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Select
            radius="sm"
            label="Cliente"
            labelPlacement="outside"
            placeholder="Selecciona un cliente"
            selectedKeys={
              selectedClientId ? new Set([selectedClientId]) : new Set([])
            }
            onSelectionChange={(keys) => {
              const key = Array.from(keys as Set<string>)[0];
              setSelectedClientId(key ?? null);
            }}
          >
            {clients.map((c) => (
              <SelectItem key={c.id}>{c.nombre}</SelectItem>
            ))}
          </Select>

          <Select
            radius="sm"
            label="Técnico responsable"
            labelPlacement="outside"
            placeholder="Selecciona un técnico"
            selectedKeys={
              selectedTechnician ? new Set([selectedTechnician]) : new Set([])
            }
            onSelectionChange={(keys) => {
              const key = Array.from(keys as Set<string>)[0];
              setSelectedTechnician(key ?? null);
            }}
          >
            {technicians.map((t) => (
              <SelectItem key={t.id}>{t.nombre}</SelectItem>
            ))}
          </Select>

          <Select
            radius="sm"
            label="Tipo de problema"
            labelPlacement="outside"
            placeholder="Selecciona el tipo"
            selectedKeys={issueType ? new Set([issueType]) : new Set([])}
            onSelectionChange={(keys) => {
              const key = Array.from(keys as Set<string>)[0];
              setIssueType(key ?? null);
            }}
          >
            {issueTypes.map((type) => (
              <SelectItem key={type.value}>{type.label}</SelectItem>
            ))}
          </Select>

          <DatePicker
            radius="sm"
            label="Fecha de atención"
            labelPlacement="outside"
          />

          <Input
            radius="sm"
            label="Duración (minutos)"
            labelPlacement="outside"
            type="number"
            placeholder="Ej: 45"
            value={duration}
            onValueChange={setDuration}
          />
        </section>
      </section>

      <Divider />

      {/* Requester Information Card */}
      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">
          2. Quien solicita la atención
        </h2>
        <article className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Input
            radius="sm"
            label="Nombre completo"
            labelPlacement="outside"
            placeholder="Nombre del solicitante"
            value={requesterName}
            onValueChange={setRequesterName}
            isRequired
          />

          <Input
            radius="sm"
            label="Correo electrónico"
            labelPlacement="outside"
            type="email"
            placeholder="correo@ejemplo.com"
            value={requesterEmail}
            onValueChange={setRequesterEmail}
            isRequired
          />

          <Input
            radius="sm"
            label="Teléfono"
            labelPlacement="outside"
            type="tel"
            placeholder="+57 300 123 4567"
            value={requesterPhone}
            onValueChange={setRequesterPhone}
            isRequired
          />
        </article>
      </section>

      <Divider />

      {/* Issue Details Card */}
      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">
          3. Detalles del problema
        </h2>
        <article className="flex flex-col gap-5">
          <Textarea
            radius="sm"
            label="Descripción del problema"
            labelPlacement="outside"
            placeholder="Describe en detalle el problema reportado"
            value={issueDescription}
            onValueChange={setIssueDescription}
            minRows={4}
            isRequired
          />

          <Textarea
            radius="sm"
            label="Solución aplicada"
            labelPlacement="outside"
            placeholder="Describe las acciones realizadas y la solución implementada"
            value={solutionApplied}
            onValueChange={setSolutionApplied}
            minRows={4}
            isRequired
          />
        </article>
      </section>

      {/* Action Buttons */}
      <section className="flex flex-row justify-end gap-4">
        <Button radius="sm" variant="light">
          Cancelar
        </Button>
        <Button radius="sm" color="primary">
          Guardar
        </Button>
      </section>
    </main>
  );
};

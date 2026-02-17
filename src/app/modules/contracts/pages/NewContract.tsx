import {
  Button,
  DatePicker,
  NumberInput,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";
import { Link } from "react-router";

const mockClients = [
  { id: "1", name: "Empresa A" },
  { id: "2", name: "Empresa B" },
  { id: "3", name: "Empresa C" },
  { id: "4", name: "Empresa D" },
  { id: "5", name: "Empresa E" },
];

const mockMachines: Record<string, { id: string; name: string }[]> = {
  "1": [
    { id: "1", name: "MP1 Cali" },
    { id: "2", name: "MP2 Palmira" },
  ],
  "2": [
    { id: "3", name: "MP1 Bogotá" },
    { id: "4", name: "MP2 Medellín" },
  ],
  "3": [
    { id: "5", name: "MP3 Yumbo" },
    { id: "6", name: "MP4 Cartago" },
  ],
  "4": [
    { id: "7", name: "MP5 Quindío" },
    { id: "8", name: "MP6 Risaralda" },
  ],
  "5": [
    { id: "9", name: "MP7 Tolima" },
    { id: "10", name: "MP8 Huila" },
  ],
};

const mockEquipment: Record<string, { id: string; name: string }[]> = {
  "1": [{ id: "E1", name: "Motor Principal" }, { id: "E2", name: "Panel de Control" }],
  "2": [{ id: "E3", name: "Compresor" }],
  "3": [{ id: "E4", name: "Bomba Hidráulica" }],
  "4": [{ id: "E5", name: "Sistema Eléctrico" }],
  "5": [{ id: "E6", name: "Motor Principal" }],
  "6": [{ id: "E7", name: "Ventilador" }],
  "7": [{ id: "E8", name: "Equipo A" }],
  "8": [{ id: "E9", name: "Equipo B" }],
  "9": [{ id: "E10", name: "Equipo C" }],
  "10": [{ id: "E11", name: "Equipo D" }],
};

const estadoOptions = [
  { value: "borrador", label: "Borrador" },
  { value: "activo", label: "Activo" },
  { value: "finalizado", label: "Finalizado" },
];

export const NewContract = () => {
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [selectedMachineId, setSelectedMachineId] = useState<string>("");
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>("");
  const [diasVisitas, setDiasVisitas] = useState<number | "">("");
  const [diasVisitasEmergencia, setDiasVisitasEmergencia] = useState<number | "">("");
  const [estado, setEstado] = useState<string>("");

  const clientMachines = selectedClientId ? mockMachines[selectedClientId] ?? [] : [];
  const machineEquipment = selectedMachineId ? mockEquipment[selectedMachineId] ?? [] : [];

  const handleClientChange = (keys: Set<string> | "all") => {
    const key = keys === "all" ? "" : Array.from(keys)[0] ?? "";
    setSelectedClientId(key);
    setSelectedMachineId("");
    setSelectedEquipmentId("");
  };

  const handleMachineChange = (keys: Set<string> | "all") => {
    const key = keys === "all" ? "" : Array.from(keys)[0] ?? "";
    setSelectedMachineId(key);
    setSelectedEquipmentId("");
  };

  const handleSubmit = () => {
    console.log({
      cliente: selectedClientId,
      maquina: selectedMachineId,
      equipo: selectedEquipmentId,
      dias_visitas: diasVisitas,
      dias_visitas_emergencia: diasVisitasEmergencia,
      estado,
    });
  };

  return (
    <main className="flex flex-col gap-8">
      <article className="flex flex-col items-start gap-4">
        <Link to="/contracts" className="text-xs border-b">
          Volver
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">Nuevo contrato</h1>
          <p className="text-sm text-default-500">
            Registra los datos del contrato con el cliente
          </p>
        </div>
      </article>

      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">
          Información del contrato
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Select
            radius="sm"
            label="Cliente"
            labelPlacement="outside"
            placeholder="Selecciona un cliente"
            selectedKeys={selectedClientId ? new Set([selectedClientId]) : new Set([])}
            onSelectionChange={(keys) =>
              handleClientChange(keys as Set<string>)
            }
          >
            {mockClients.map((c) => (
              <SelectItem key={c.id}>{c.name}</SelectItem>
            ))}
          </Select>

          <Select
            radius="sm"
            label="Máquina"
            labelPlacement="outside"
            placeholder={
              selectedClientId ? "Selecciona una máquina" : "Selecciona primero un cliente"
            }
            isDisabled={!selectedClientId}
            selectedKeys={selectedMachineId ? new Set([selectedMachineId]) : new Set([])}
            onSelectionChange={(keys) =>
              handleMachineChange(keys as Set<string>)
            }
          >
            {clientMachines.map((m) => (
              <SelectItem key={m.id}>{m.name}</SelectItem>
            ))}
          </Select>

          <Select
            radius="sm"
            label="Equipo"
            labelPlacement="outside"
            placeholder={
              selectedMachineId
                ? "Selecciona un equipo"
                : "Selecciona primero una máquina"
            }
            isDisabled={!selectedMachineId}
            selectedKeys={
              selectedEquipmentId ? new Set([selectedEquipmentId]) : new Set([])
            }
            onSelectionChange={(keys) => {
              const key = keys === "all" ? "" : Array.from(keys as Set<string>)[0] ?? "";
              setSelectedEquipmentId(key);
            }}
          >
            {machineEquipment.map((e) => (
              <SelectItem key={e.id}>{e.name}</SelectItem>
            ))}
          </Select>

          <DatePicker
            radius="sm"
            label="Fecha de inicio"
            labelPlacement="outside"
          />

          <DatePicker
            radius="sm"
            label="Fecha de fin"
            labelPlacement="outside"
          />

          <NumberInput
            radius="sm"
            label="Días de visitas"
            labelPlacement="outside"
            placeholder="Ej: 12"
            minValue={0}
            value={diasVisitas === "" ? undefined : diasVisitas}
            onValueChange={(n) => setDiasVisitas(n)}
          />

          <NumberInput
            radius="sm"
            label="Días de visitas de emergencia"
            labelPlacement="outside"
            placeholder="Ej: 2"
            minValue={0}
            value={diasVisitasEmergencia === "" ? undefined : diasVisitasEmergencia}
            onValueChange={(n) => setDiasVisitasEmergencia(n)}
          />

          <Select
            radius="sm"
            label="Estado"
            labelPlacement="outside"
            placeholder="Selecciona el estado"
            selectedKeys={estado ? new Set([estado]) : new Set([])}
            onSelectionChange={(keys) => {
              const key = keys === "all" ? "" : Array.from(keys as Set<string>)[0] ?? "";
              setEstado(key);
            }}
          >
            {estadoOptions.map((opt) => (
              <SelectItem key={opt.value}>{opt.label}</SelectItem>
            ))}
          </Select>
        </section>
      </section>

      <section className="flex flex-row justify-end gap-4">
        <Button as={Link} to="/contracts" radius="sm" variant="light">
          Cancelar
        </Button>
        <Button
          radius="sm"
          color="primary"
          onPress={handleSubmit}
          isDisabled={
            !selectedClientId || !selectedMachineId || !estado
          }
        >
          Crear contrato
        </Button>
      </section>
    </main>
  );
};

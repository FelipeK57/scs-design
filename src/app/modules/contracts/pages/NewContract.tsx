import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { ChevronLeft, Calendar, Building2, Wrench, Gift } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

// Mock data
const mockClients = [
  { id: 1, name: "Empresa A" },
  { id: 2, name: "Empresa B" },
  { id: 3, name: "Empresa C" },
  { id: 4, name: "Empresa D" },
  { id: 5, name: "Empresa E" },
];

const mockMachines = {
  1: [
    { id: 1, name: "MP1 Cali" },
    { id: 2, name: "MP2 Palmira" },
  ],
  2: [
    { id: 3, name: "MP1 Bogotá" },
    { id: 4, name: "MP2 Medellín" },
  ],
  3: [
    { id: 5, name: "MP3 Yumbo" },
    { id: 6, name: "MP4 Cartago" },
  ],
  4: [
    { id: 7, name: "MP5 Quindío" },
    { id: 8, name: "MP6 Risaralda" },
  ],
  5: [
    { id: 9, name: "MP7 Tolima" },
    { id: 10, name: "MP8 Huila" },
  ],
};

const mockBenefits = [
  "Mantenimiento preventivo mensual",
  "Asistencia técnica 24/7",
  "Repuestos con descuento 15%",
  "Capacitación de operadores",
  "Inspección trimestral",
  "Diagnóstico de vibraciones",
  "Calibración de instrumentos",
  "Reparación de emergencia",
];

export const NewContract = () => {
  const navigate = useNavigate();

  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [selectedMachineId, setSelectedMachineId] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  const clientMachines = selectedClientId
    ? mockMachines[parseInt(selectedClientId) as keyof typeof mockMachines] || []
    : [];

  const handleBenefitToggle = (benefit: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(benefit)
        ? prev.filter((b) => b !== benefit)
        : [...prev, benefit]
    );
  };

  const handleSubmit = () => {
    // TODO: Submit form data to API
    console.log({
      client: selectedClientId,
      machine: selectedMachineId,
      duration,
      benefits: selectedBenefits,
      description,
    });
  };

  return (
    <main className="flex flex-col gap-6 pb-8">
      {/* Header */}
      <article className="flex flex-row gap-3 items-center">
        <Button
          isIconOnly
          variant="light"
          size="lg"
          className="hover:bg-default-100"
          onPress={() => navigate("/contracts")}
        >
          <ChevronLeft className="size-6" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Crear nuevo contrato
          </h1>
          <p className="text-sm text-default-500 mt-1">
            Registra los detalles del contrato con el cliente
          </p>
        </div>
      </article>

      {/* Basic Information Card */}
      <Card className="shadow-sm border-1 border-default-200 p-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="size-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Información básica
            </h2>
          </div>
        </CardHeader>
        <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Select
            label="Cliente"
            placeholder="Selecciona un cliente"
            value={selectedClientId}
            onChange={(e) => {
              setSelectedClientId(e.target.value);
              setSelectedMachineId(""); // Reset machine when client changes
            }}
            description="Empresa con la que se abre el contrato"
          >
            {mockClients.map((client) => (
              <SelectItem key={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Máquina"
            placeholder="Selecciona una máquina"
            value={selectedMachineId}
            onChange={(e) => setSelectedMachineId(e.target.value)}
            description="Equipo que cubre el contrato"
            disabled={!selectedClientId}
          >
            {clientMachines.map((machine) => (
              <SelectItem key={machine.id}>
                {machine.name}
              </SelectItem>
            ))}
          </Select>

          <Input
            label="Duración"
            placeholder="Ej: 12 meses"
            value={duration}
            onValueChange={setDuration}
            description="Período de vigencia del contrato"
            startContent={<Calendar className="size-4 text-default-400" />}
          />
        </CardBody>
      </Card>

      {/* Benefits Selection Card */}
      <Card className="shadow-sm border-1 border-default-200 p-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gift className="size-5 text-success" />
            <h2 className="text-lg font-semibold text-foreground">
              Beneficios incluidos
            </h2>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-3">
          <p className="text-sm text-default-500 mb-2">
            Selecciona los beneficios que incluye este contrato
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockBenefits.map((benefit) => (
              <button
                key={benefit}
                onClick={() => handleBenefitToggle(benefit)}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                  selectedBenefits.includes(benefit)
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-default-200 bg-content1 text-default-500 hover:border-default-300"
                }`}
              >
                <div
                  className={`size-5 rounded border-2 flex items-center justify-center ${
                    selectedBenefits.includes(benefit)
                      ? "border-primary bg-primary"
                      : "border-default-300"
                  }`}
                >
                  {selectedBenefits.includes(benefit) && (
                    <svg
                      className="size-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium flex-1 text-left">
                  {benefit}
                </span>
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Additional Information Card */}
      <Card className="shadow-sm border-1 border-default-200 p-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="size-5 text-warning" />
            <h2 className="text-lg font-semibold text-foreground">
              Detalles adicionales
            </h2>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-5">
          <Textarea
            label="Descripción o notas especiales"
            placeholder="Añade cualquier información adicional sobre el contrato..."
            value={description}
            onValueChange={setDescription}
            description="Información adicional del contrato"
            minRows={4}
            className="w-full"
          />
        </CardBody>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button
          variant="flat"
          size="lg"
          onPress={() => navigate("/contracts")}
        >
          Cancelar
        </Button>
        <Button
          color="primary"
          variant="flat"
          size="lg"
          isDisabled={!selectedClientId || !selectedMachineId || !duration}
          onPress={handleSubmit}
        >
          Crear contrato
        </Button>
      </div>
    </main>
  );
};

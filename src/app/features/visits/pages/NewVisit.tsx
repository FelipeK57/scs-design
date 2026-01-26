import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Chip,
  cn,
  DatePicker,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import {
  ChevronLeft,
  FileText,
  Calendar,
  Clock,
  ClipboardCheck,
  AlertCircle,
  MessageSquare,
  Save,
} from "lucide-react";
import { useMemo, useState } from "react";

export const NewVisit = () => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
  const [visitType, setVisitType] = useState<string | null>(null);

  // Mock de clientes/maquinas con contrato
  const clients = [
    {
      id: "client1",
      nombre: "Cliente 1",
      maquinas: [
        { id: "machine1", nombre: "MP1 Cali", contrato_abierto: true },
        { id: "machine2", nombre: "MP2 Yumbo", contrato_abierto: false },
      ],
    },
    {
      id: "client2",
      nombre: "Cliente 2",
      maquinas: [
        { id: "machine3", nombre: "MP3 Palmira", contrato_abierto: true },
      ],
    },
    {
      id: "client3",
      nombre: "Cliente 3",
      maquinas: [
        { id: "machine4", nombre: "MP4 Jamundí", contrato_abierto: false },
      ],
    },
  ];

  const selectedClient = useMemo(
    () => clients.find((c) => c.id === selectedClientId) || null,
    [clients, selectedClientId]
  );

  const selectedMachine = useMemo(() => {
    if (!selectedClient) return null;
    return selectedClient.maquinas.find((m) => m.id === selectedMachineId) || null;
  }, [selectedClient, selectedMachineId]);

  const canManageActivities = !!selectedMachine && selectedMachine.contrato_abierto === true;
  const isTypeForcedAdditional = !!selectedMachine && selectedMachine.contrato_abierto === false;
  const effectiveVisitType = isTypeForcedAdditional ? "additional" : visitType;
  const preventiveActivities = [
    {
      value: "inspeccion",
      label: "Inspección visual de equipos",
      priority: "Alta",
      color: "danger",
    },
    {
      value: "limpieza",
      label: "Limpieza de componentes",
      priority: "Media",
      color: "warning",
    },
    {
      value: "calibracion",
      label: "Calibración de instrumentos",
      priority: "Baja",
      color: "success",
    },
    {
      value: "verificacion",
      label: "Verificación de seguridad",
      priority: "Alta",
      color: "danger",
    },
    {
      value: "mantenimiento",
      label: "Mantenimiento preventivo",
      priority: "Media",
      color: "warning",
    },
  ];

  const pendingActivities = [
    { value: "reparacion", label: "Reparación de fallas", date: "2024-06-01" },
    {
      value: "sustitucion",
      label: "Sustitución de piezas",
      date: "2024-06-05",
    },
    {
      value: "actualizacion",
      label: "Actualización de software",
      date: "2024-06-10",
    },
    {
      value: "capacitación",
      label: "Capacitación del personal",
      date: "2024-06-15",
    },
  ];

  return (
    <main className="flex flex-col gap-6 pb-8">
      {/* Header Section */}
      <article className="flex flex-row gap-3 items-center">
        <Button 
          isIconOnly 
          variant="light" 
          size="lg"
          className="hover:bg-default-100"
        >
          <ChevronLeft className="size-6" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-50 rounded-lg">
            <FileText className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Planificación de visita
            </h1>
            <p className="text-sm text-default-500">
              Completa los detalles para programar una nueva visita
            </p>
          </div>
        </div>
      </article>

      {/* Details Card */}
      <Card className="shadow-none border-1 border-default-200">
        <CardHeader className="pb-3 px-6 pt-6">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Detalles de la visita
            </h2>
          </div>
        </CardHeader>
        <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-5 px-6 pb-6">
          <Select
            label="Seleccionar cliente"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Selecciona un cliente"
            selectedKeys={selectedClientId ? new Set([selectedClientId]) : new Set([])}
            onSelectionChange={(keys) => {
              const key = Array.from(keys as Set<string>)[0];
              setSelectedClientId(key ?? null);
              setSelectedMachineId(null);
              setVisitType(null);
            }}
          >
            {clients.map((c) => (
              <SelectItem key={c.id}>{c.nombre}</SelectItem>
            ))}
          </Select>
          <Select
            label="Seleccionar máquina"
            labelPlacement="outside"
            variant="bordered"
            placeholder={selectedClient ? "Selecciona una máquina" : "Selecciona primero un cliente"}
            isDisabled={!selectedClient}
            selectedKeys={selectedMachineId ? new Set([selectedMachineId]) : new Set([])}
            onSelectionChange={(keys) => {
              const key = Array.from(keys as Set<string>)[0];
              setSelectedMachineId(key ?? null);
              const machine = (selectedClient?.maquinas ?? []).find((m) => m.id === key) || null;
              if (machine && !machine.contrato_abierto) {
                setVisitType("additional");
              } else {
                setVisitType(null);
              }
            }}
          >
            {(selectedClient?.maquinas ?? []).map((m) => (
              <SelectItem key={m.id}>{m.nombre}</SelectItem>
            ))}
          </Select>
          <Select
            label="Responsable de la visita"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Selecciona un responsable"
          >
            <SelectItem key="responsible1">Responsable 1</SelectItem>
            <SelectItem key="responsible2">Responsable 2</SelectItem>
            <SelectItem key="responsible3">Responsable 3</SelectItem>
          </Select>
          <Select
            label="Tipo de visita"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Selecciona un tipo de visita"
            selectedKeys={effectiveVisitType ? new Set([effectiveVisitType]) : new Set([])}
            isDisabled={isTypeForcedAdditional}
            onSelectionChange={(keys) => {
              if (isTypeForcedAdditional) return;
              const key = Array.from(keys as Set<string>)[0];
              setVisitType(key ?? null);
            }}
          >
            <SelectItem key="maintenance">Mantenimiento</SelectItem>
            <SelectItem key="emergency">Emergencia</SelectItem>
            <SelectItem key="additional">Adicional</SelectItem>
          </Select>
          <DatePicker
            label="Fecha de la visita"
            labelPlacement="outside"
            variant="bordered"
          />
          <NumberInput
            label="Días de duración"
            labelPlacement="outside"
            placeholder="Ingresa número de días"
            variant="bordered"
            minValue={1}
            startContent={<Clock className="size-4 text-default-400" />}
          />
          {/* Estado de contrato */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-default-500">Estado de contrato:</span>
            {selectedMachine ? (
              selectedMachine.contrato_abierto ? (
                <Chip size="sm" variant="flat" color="success">Activo</Chip>
              ) : (
                <Chip size="sm" variant="flat" color="danger">No activo</Chip>
              )
            ) : (
              <Chip size="sm" variant="flat" color="default">Sin selección</Chip>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Activities Section OR Todo depending on contract */}
      {canManageActivities ? (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preventive Activities */}
          <Card className="shadow-none border-1 border-default-200">
            <CardHeader className="pb-3 px-6 pt-6">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="size-5 text-success" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Actividades preventivas
                  </h2>
                </div>
                <Chip size="sm" variant="flat" color="success">
                  {preventiveActivities.length}
                </Chip>
              </div>
            </CardHeader>
            <CardBody className="px-6 pb-6">
              <CheckboxGroup 
                disableAnimation 
                aria-label="actividades preventivas"
                classNames={{
                  base: "gap-3"
                }}
              >
                {preventiveActivities.map(({ value, label, priority, color }) => (
                  <Checkbox
                    key={value}
                    classNames={{
                      base: cn(
                        "inline-flex max-w-full w-full bg-content1 m-0",
                        "hover:bg-content2 items-center justify-start",
                        "cursor-pointer rounded-lg gap-2 p-3 border-2 border-transparent",
                        "data-[selected=true]:border-primary transition-all"
                      ),
                      label: "w-full",
                    }}
                    value={value}
                  >
                    <div className="flex justify-between items-center w-full gap-2">
                      <span className="text-sm font-medium">{label}</span>
                      <Chip size="sm" variant="flat" color={color as any}>
                        {priority}
                      </Chip>
                    </div>
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </CardBody>
          </Card>

          {/* Pending Activities */}
          <Card className="shadow-none border-1 border-default-200">
            <CardHeader className="pb-3 px-6 pt-6">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-5 text-warning" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Actividades pendientes
                  </h2>
                </div>
                <Chip size="sm" variant="flat" color="warning">
                  {pendingActivities.length}
                </Chip>
              </div>
            </CardHeader>
            <CardBody className="px-6 pb-6">
              <CheckboxGroup 
                aria-label="actividades pendientes"
                classNames={{
                  base: "gap-3"
                }}
              >
                {pendingActivities.map(({ value, label, date }) => (
                  <Checkbox
                    key={value}
                    classNames={{
                      base: cn(
                        "inline-flex max-w-full w-full bg-content1 m-0",
                        "hover:bg-content2 items-center justify-start",
                        "cursor-pointer rounded-lg gap-2 p-3 border-2 border-transparent",
                        "data-[selected=true]:border-primary transition-all"
                      ),
                      label: "w-full",
                    }}
                    value={value}
                  >
                    <div className="flex flex-col gap-1 w-full">
                      <span className="text-sm font-medium">{label}</span>
                      <span className="text-xs text-default-400">
                        Reportado el: {date}
                      </span>
                    </div>
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </CardBody>
          </Card>
        </section>
      ) : (
        <Card className="shadow-none border-1 border-default-200">
          <CardHeader className="pb-3 px-6 pt-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Plan de trabajo (sin contrato activo)
              </h2>
            </div>
          </CardHeader>
          <CardBody className="px-6 pb-6">
            <Textarea
              label="Tareas a realizar"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Escribe las tareas que se realizarán en esta visita. Por ejemplo: inspección general, limpieza, verificación básica, etc."
              minRows={6}
              classNames={{
                input: "resize-y",
              }}
            />
          </CardBody>
        </Card>
      )}

      {/* Additional Notes Card */}
      <Card className="shadow-none border-1 border-default-200">
        <CardHeader className="pb-3 px-6 pt-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Observaciones adicionales
            </h2>
          </div>
        </CardHeader>
        <CardBody className="px-6 pb-6">
          <Textarea
            label="Notas"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Escribe aquí las notas adicionales, requerimientos especiales o consideraciones importantes..."
            minRows={4}
            classNames={{
              input: "resize-y",
            }}
          />
        </CardBody>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button 
          variant="flat" 
          size="lg"
          className="font-medium"
        >
          Cancelar
        </Button>
        <Button 
          color="primary" 
          size="lg"
          startContent={<Save className="size-4" />}
          className="font-medium px-8"
        >
          Crear visita
        </Button>
      </div>
    </main>
  );
};

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
  Input,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { ChevronLeft, Clock, Pencil, Save, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

export const NewVisit = () => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(
    null,
  );
  const [visitType, setVisitType] = useState<string | null>(null);
  const [customTaskInput, setCustomTaskInput] = useState("");
  const [customTasks, setCustomTasks] = useState<string[]>([]);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editTaskInput, setEditTaskInput] = useState("");

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
    [clients, selectedClientId],
  );

  const selectedMachine = useMemo(() => {
    if (!selectedClient) return null;
    return (
      selectedClient.maquinas.find((m) => m.id === selectedMachineId) || null
    );
  }, [selectedClient, selectedMachineId]);

  const canManageActivities =
    !!selectedMachine && selectedMachine.contrato_abierto === true;
  const isTypeForcedAdditional =
    !!selectedMachine && selectedMachine.contrato_abierto === false;
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

  const isPreventiveAllowed =
    canManageActivities &&
    (effectiveVisitType === "maintenance" ||
      effectiveVisitType === "additional");

  const isEmergencyVisit = effectiveVisitType === "emergency";
  const isAdditionalWithoutContract =
    !canManageActivities && effectiveVisitType === "additional";

  const addCustomTask = () => {
    const trimmed = customTaskInput.trim();
    if (!trimmed) return;
    setCustomTasks((prev) => [...prev, trimmed]);
    setCustomTaskInput("");
  };

  const removeCustomTask = (task: string) => {
    setCustomTasks((prev) => prev.filter((item) => item !== task));
  };

  const startEditTask = (task: string) => {
    setEditingTask(task);
    setEditTaskInput(task);
  };

  const cancelEditTask = () => {
    setEditingTask(null);
    setEditTaskInput("");
  };

  const saveEditTask = (task: string) => {
    const trimmed = editTaskInput.trim();
    if (!trimmed) return;
    setCustomTasks((prev) =>
      prev.map((item) => (item === task ? trimmed : item)),
    );
    setEditingTask(null);
    setEditTaskInput("");
  };

  return (
    <main className="flex flex-col gap-6 pb-8">
      {/* Header Section */}
      <article className="flex flex-row gap-3 items-center">
        <Button
          as={Link}
          to="/visits"
          isIconOnly
          variant="light"
          size="lg"
          className="hover:bg-default-100"
        >
          <ChevronLeft className="size-6" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Planificación de visita
          </h1>
          <p className="text-sm text-default-500">
            Completa los detalles para programar una nueva visita
          </p>
        </div>
      </article>

      {/* Details Card */}
      <Card className="shadow-small p-4">
        <CardHeader>
          <h2 className="text-lg font-semibold text-foreground">
            Detalles de la visita
          </h2>
        </CardHeader>
        <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Select
            label="Seleccionar cliente"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Selecciona un cliente"
            selectedKeys={
              selectedClientId ? new Set([selectedClientId]) : new Set([])
            }
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
            placeholder={
              selectedClient
                ? "Selecciona una máquina"
                : "Selecciona primero un cliente"
            }
            isDisabled={!selectedClient}
            selectedKeys={
              selectedMachineId ? new Set([selectedMachineId]) : new Set([])
            }
            onSelectionChange={(keys) => {
              const key = Array.from(keys as Set<string>)[0];
              setSelectedMachineId(key ?? null);
              const machine =
                (selectedClient?.maquinas ?? []).find((m) => m.id === key) ||
                null;
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
            selectedKeys={
              effectiveVisitType ? new Set([effectiveVisitType]) : new Set([])
            }
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
            <span className="text-sm text-default-500">
              Estado de contrato:
            </span>
            {selectedMachine ? (
              selectedMachine.contrato_abierto ? (
                <Chip size="sm" variant="flat" color="success">
                  Activo
                </Chip>
              ) : (
                <Chip size="sm" variant="flat" color="danger">
                  No activo
                </Chip>
              )
            ) : (
              <Chip size="sm" variant="flat" color="default">
                Sin selección
              </Chip>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Activities Section depending on visit type */}
      {effectiveVisitType ? (
        isPreventiveAllowed ? (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Preventive Activities */}
            <Card className="shadow-small p-4">
              <CardHeader>
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-lg font-semibold text-foreground">
                    Actividades preventivas
                  </h2>
                  <Chip size="sm" variant="flat">
                    {preventiveActivities.length}
                  </Chip>
                </div>
              </CardHeader>
              <CardBody>
                <CheckboxGroup
                  disableAnimation
                  aria-label="actividades preventivas"
                  classNames={{
                    base: "gap-3",
                  }}
                >
                  {preventiveActivities.map(
                    ({ value, label, priority, color }) => (
                      <Checkbox
                        key={value}
                        classNames={{
                          base: cn(
                            "inline-flex max-w-full w-full bg-content1 m-0",
                            "hover:bg-content2 items-center justify-start",
                            "cursor-pointer rounded-lg gap-2 p-3 border-2 border-transparent",
                            "data-[selected=true]:border-primary transition-all",
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
                    ),
                  )}
                </CheckboxGroup>
              </CardBody>
            </Card>

            {/* Pending Activities */}
            <Card className="shadow-small p-4">
              <CardHeader>
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-lg font-semibold text-foreground">
                    Actividades pendientes
                  </h2>
                  <Chip size="sm" variant="flat">
                    {pendingActivities.length}
                  </Chip>
                </div>
              </CardHeader>
              <CardBody>
                <CheckboxGroup
                  disableAnimation
                  aria-label="actividades pendientes"
                  classNames={{
                    base: "gap-3",
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
                          "data-[selected=true]:border-primary transition-all",
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
        ) : isEmergencyVisit ? (
          <Card className="shadow-small p-4">
            <CardHeader>
              <h2 className="text-lg font-semibold text-foreground">
                Emergencia: diagnóstico inicial
              </h2>
            </CardHeader>
            <CardBody className="flex flex-col gap-5">
              <Textarea
                label="Problema inicial"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Describe el problema reportado por el cliente"
                minRows={4}
              />
              <Textarea
                label="Actividades previas (sin solución)"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Lista las actividades realizadas previamente que no solucionaron el problema"
                minRows={4}
              />
            </CardBody>
          </Card>
        ) : isAdditionalWithoutContract ? (
          <Card className="shadow-small p-4">
            <CardHeader>
              <h2 className="text-lg font-semibold text-foreground">
                Checklist solicitado por el cliente
              </h2>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  variant="bordered"
                  value={customTaskInput}
                  onChange={(event) => setCustomTaskInput(event.target.value)}
                  placeholder="Agregar actividad solicitada"
                />
                <Button
                  color="primary"
                  onPress={addCustomTask}
                  isDisabled={!customTaskInput.trim()}
                >
                  Agregar
                </Button>
              </div>

              <div className="flex flex-col gap-3">
                {customTasks.length === 0 ? (
                  <p className="text-sm text-default-500">
                    Agrega actividades para construir la checklist.
                  </p>
                ) : (
                  customTasks.map((task) => (
                    <div
                      key={task}
                      className="flex items-center gap-4 w-full rounded-lg border border-default-200 bg-content1 py-3 px-4"
                    >
                      {editingTask === task ? (
                        <>
                          <Input
                            value={editTaskInput}
                            onChange={(event) =>
                              setEditTaskInput(event.target.value)
                            }
                            variant="underlined"
                          />
                          <Button
                            isIconOnly
                            color="primary"
                            onPress={() => saveEditTask(task)}
                            isDisabled={!editTaskInput.trim()}
                          >
                            <Save className="size-4" />
                          </Button>
                          <Button
                            isIconOnly
                            color="danger"
                            variant="light"
                            onPress={cancelEditTask}
                          >
                            <X className="size-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <span className="text-sm font-medium flex-1">
                            {task}
                          </span>
                          <Button
                            isIconOnly
                            color="primary"
                            variant="light"
                            onPress={() => startEditTask(task)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            isIconOnly
                            color="danger"
                            variant="light"
                            onPress={() => removeCustomTask(task)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardBody>
          </Card>
        ) : null
      ) : null}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="flat" size="lg" className="font-medium">
          Cancelar
        </Button>
        <Button color="primary" size="lg" className="font-medium">
          Crear visita
        </Button>
      </div>
    </main>
  );
};

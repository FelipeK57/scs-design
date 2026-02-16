import { useState } from "react";
import {
  Card,
  CardBody,
  Divider,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableColumn,
  TableHeader,
} from "@heroui/react";
import {
  ChevronRight,
  ChevronDown,
  Box,
  Cpu,
  Zap,
  Package,
} from "lucide-react";
import { useParams, Link } from "react-router";

// Mock data structure
const mockClientData = {
  1: {
    id: 1,
    name: "Empresa A",
    contract: "CNT-2024-001",
    machines: [
      {
        id: "M001",
        name: "Máquina Industrial A1",
        equipment: [
          {
            id: "E001",
            name: "Motor Principal",
            subsystems: [
              {
                id: "S001",
                name: "Sistema de Potencia",
                preventive_activities: [
                  {
                    id: "PA001",
                    name: "Inspección visual de equipos",
                    completed: true,
                    frequency_months: 12,
                    last_activity: "2024-01-01",
                  },
                  {
                    id: "PA002",
                    name: "Inspección visual de equipos",
                    completed: true,
                    frequency_months: 12,
                    last_activity: "2024-01-01",
                  },
                  {
                    id: "PA003",
                    name: "Inspección visual de equipos",
                    completed: true,
                    frequency_months: 12,
                    last_activity: "2024-01-01",
                  },
                ],
                pending_activities: [
                  {
                    id: "PA002",
                    name: "Reparación de fallas",
                    completed: false,
                    frequency_months: 12,
                    last_activity: "2024-01-01",
                  },
                ],
                components: [
                  {
                    id: "C001",
                    name: "Bobinado",
                    spare_parts: [
                      { id: "SP001", name: "Alambre de Cobre 2.5mm" },
                      { id: "SP002", name: "Aislante de Mica" },
                    ],
                  },
                  {
                    id: "C002",
                    name: "Núcleo Magnético",
                    spare_parts: [
                      { id: "SP003", name: "Lámina de Acero Silicio" },
                    ],
                  },
                ],
              },
              {
                id: "S002",
                name: "Sistema de Refrigeración",
                preventive_activities: [],
                pending_activities: [],
                components: [
                  {
                    id: "C003",
                    name: "Ventilador",
                    spare_parts: [
                      { id: "SP004", name: "Aspa de Aluminio" },
                      { id: "SP005", name: "Rodamiento SKF" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "E002",
            name: "Panel de Control",
            subsystems: [
              {
                id: "S003",
                name: "Sistema Eléctrico",
                preventive_activities: [],
                pending_activities: [],
                components: [
                  {
                    id: "C004",
                    name: "Fuente de Alimentación",
                    spare_parts: [
                      { id: "SP006", name: "Transformador 500W" },
                      { id: "SP007", name: "Capacitor 100µF" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "M002",
        name: "Máquina Industrial A2",
        equipment: [
          {
            id: "E003",
            name: "Compresor",
            subsystems: [
              {
                id: "S004",
                name: "Sistema de Compresión",
                preventive_activities: [],
                pending_activities: [],
                components: [
                  {
                    id: "C005",
                    name: "Pistón",
                    spare_parts: [{ id: "SP008", name: "Anillo de Pistón" }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // Más clientes...
};

export interface Activity {
  id: string;
  name: string;
  completed: boolean;
  frequency_months: number;
  last_activity?: string;
}

interface TreeNode {
  id: string;
  name: string;
  type: "machine" | "equipment" | "subsystem" | "component" | "part";
  children?: TreeNode[];
  preventive_activities?: Activity[];
  pending_activities?: Activity[];
}

const typeLabels: Record<TreeNode["type"], string> = {
  machine: "Máquina",
  equipment: "Equipo",
  subsystem: "Subsistema",
  component: "Componente",
  part: "Repuesto",
};

const childTypeMap: Partial<Record<TreeNode["type"], TreeNode["type"]>> = {
  machine: "equipment",
  equipment: "subsystem",
  subsystem: "component",
  component: "part",
};

const childLabelMap: Partial<Record<TreeNode["type"], string>> = {
  machine: "equipo",
  equipment: "subsistema",
  subsystem: "componente",
  component: "repuesto",
};

interface TreeItemProps {
  node: TreeNode;
  level: number;
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
  onSelect: (node: TreeNode) => void;
  selectedNode: TreeNode | null;
}

const TreeItem = ({
  node,
  level,
  expanded,
  onToggle,
  onSelect,
  selectedNode,
}: TreeItemProps) => {
  const isExpanded = expanded[node.id] || false;
  const hasChildren = node.children && node.children.length > 0;

  const getIcon = (type: string) => {
    switch (type) {
      case "machine":
        return <Box className="size-4" />;
      case "equipment":
        return <Cpu className="size-4" />;
      case "subsystem":
        return <Zap className="size-4" />;
      case "component":
        return <Package className="size-4" />;
      case "part":
        return <Package className="size-4" />;
      default:
        return null;
    }
  };

  const getLevelColor = (level: number) => {
    const colors = [
      "text-blue-600",
      "text-purple-600",
      "text-green-600",
      "text-orange-600",
      "text-red-600",
    ];
    return colors[level % colors.length];
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 p-2 rounded-sm cursor-pointer transition-colors ${
          selectedNode?.id === node.id
            ? "bg-primary-50 border-l-4 border-primary"
            : "hover:bg-default-100"
        }`}
        style={{ paddingLeft: `${level * 10 + 12}px` }}
        onClick={() => onSelect(node)}
      >
        {hasChildren && (
          <button
            onClick={() => {
              onToggle(node.id);
            }}
          >
            {isExpanded ? (
              <ChevronDown className="size-4 text-default-500" />
            ) : (
              <ChevronRight className="size-4 text-default-500" />
            )}
          </button>
        )}
        {!hasChildren && <div className="size-4" />}
        <span className={getLevelColor(level)}>{getIcon(node.type)}</span>
        <span className="text-xs font-medium text-foreground">{node.name}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className="flex flex-col gap-1.5 mt-1">
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedNode={selectedNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ClientDetails = () => {
  const { clientId } = useParams();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [activityKind, setActivityKind] = useState<
    "preventive_activities" | "pending_activities"
  >("preventive_activities");
  const [activityName, setActivityName] = useState("");
  const [activityFrequencyMonths, setActivityFrequencyMonths] = useState(12);

  const clientData =
    mockClientData[clientId as unknown as keyof typeof mockClientData];

  if (!clientData) {
    return (
      <main className="flex flex-col gap-8 pb-8 w-full">
        <article className="flex flex-col items-start gap-4">
          <Link to="/clients" className="text-xs border-b">
            Volver
          </Link>
          <h1 className="text-xl font-bold text-foreground">
            Cliente no encontrado
          </h1>
        </article>
      </main>
    );
  }

  // Build tree structure (mapeamos preventive_activities y pending_activities en subsistemas)
  const [treeData, setTreeData] = useState<TreeNode[]>(() =>
    clientData.machines.map((machine) => ({
      id: machine.id,
      name: machine.name,
      type: "machine" as const,
      children: machine.equipment.map((equip) => ({
        id: equip.id,
        name: equip.name,
        type: "equipment" as const,
        children: equip.subsystems.map((sub) => {
          const subsys = sub as {
            id: string;
            name: string;
            components: { id: string; name: string; spare_parts: { id: string; name: string }[] }[];
            preventive_activities?: Activity[];
            pending_activities?: Activity[];
          };
          return {
            id: subsys.id,
            name: subsys.name,
            type: "subsystem" as const,
            preventive_activities: subsys.preventive_activities ?? [],
            pending_activities: subsys.pending_activities ?? [],
            children: subsys.components.map((comp) => ({
              id: comp.id,
              name: comp.name,
              type: "component" as const,
              children: comp.spare_parts.map((part) => ({
                id: part.id,
                name: part.name,
                type: "part" as const,
              })),
            })),
          };
        }),
      })),
    })),
  );

  const getNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = getNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const updateSubsystemActivities = (
    nodes: TreeNode[],
    subsystemId: string,
    kind: "preventive_activities" | "pending_activities",
    newActivity: Activity,
  ): TreeNode[] =>
    nodes.map((node): TreeNode => {
      if (node.type === "subsystem" && node.id === subsystemId) {
        const list = node[kind] ?? [];
        return { ...node, [kind]: [...list, newActivity] };
      }
      if (node.children) {
        return {
          ...node,
          children: updateSubsystemActivities(
            node.children,
            subsystemId,
            kind,
            newActivity,
          ),
        };
      }
      return node;
    });

  const addChildToTree = (
    nodes: TreeNode[],
    parentId: string,
    child: TreeNode,
  ): TreeNode[] => {
    return nodes.map((node) => {
      if (node.id === parentId) {
        const children = node.children ?? [];
        return { ...node, children: [...children, child] };
      }

      if (node.children) {
        return {
          ...node,
          children: addChildToTree(node.children, parentId, child),
        };
      }

      return node;
    });
  };

  const handleToggle = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelect = (node: TreeNode) => {
    setSelectedNode(node);
  };

  const currentChildType =
    selectedNode && childTypeMap[selectedNode.type]
      ? childTypeMap[selectedNode.type]
      : undefined;

  const currentChildLabel =
    selectedNode && childLabelMap[selectedNode.type]
      ? childLabelMap[selectedNode.type]
      : undefined;

  const openAddModal = () => {
    if (!selectedNode || !currentChildType) return;
    setNewChildName("");
    setIsAddModalOpen(true);
  };

  const handleConfirmAddChild = () => {
    if (!selectedNode || !currentChildType || !newChildName.trim()) {
      setIsAddModalOpen(false);
      return;
    }

    const newId = `${selectedNode.id}-${Date.now()}`;
    const newChild: TreeNode = {
      id: newId,
      name: newChildName.trim(),
      type: currentChildType,
      ...(currentChildType === "subsystem"
        ? { preventive_activities: [], pending_activities: [] }
        : {}),
    };

    setTreeData((prev) => addChildToTree(prev, selectedNode.id, newChild));
    setExpanded((prev) => ({ ...prev, [selectedNode.id]: true }));
    setIsAddModalOpen(false);
  };

  const openActivityModal = (kind: "preventive_activities" | "pending_activities") => {
    setActivityKind(kind);
    setActivityName("");
    setActivityFrequencyMonths(12);
    setIsActivityModalOpen(true);
  };

  const handleConfirmAddActivity = () => {
    if (!selectedNode || selectedNode.type !== "subsystem" || !activityName.trim()) {
      setIsActivityModalOpen(false);
      return;
    }
    const newActivity: Activity = {
      id: `${selectedNode.id}-${activityKind === "preventive_activities" ? "PA" : "PE"}-${Date.now()}`,
      name: activityName.trim(),
      completed: false,
      frequency_months: activityFrequencyMonths,
    };
    setTreeData((prev) =>
      updateSubsystemActivities(prev, selectedNode.id, activityKind, newActivity),
    );
    setIsActivityModalOpen(false);
  };

  return (
    <main className="flex flex-col gap-8 pb-8 w-full">
      {/* Header Section */}
      <article className="flex flex-col items-start gap-4">
        <Link to="/clients" className="text-xs border-b">
          Volver
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {clientData.name}
          </h1>
          <p className="text-sm text-default-500">
            Contrato: {clientData.contract}
          </p>
        </div>
      </article>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tree Navigation */}
        <Card className="lg:col-span-1 p-2 h-fit sticky top-0" shadow="sm" radius="sm">
          <CardBody className="gap-0">
            <h2 className="font-semibold mb-4 text-foreground">
              Estructura de Equipos
            </h2>
            <Divider className="mb-4" />
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
              {treeData.map((machine) => (
                <TreeItem
                  key={machine.id}
                  node={machine}
                  level={0}
                  expanded={expanded}
                  onToggle={handleToggle}
                  onSelect={handleSelect}
                  selectedNode={selectedNode}
                />
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Details Panel */}
        <section className="lg:col-span-2 flex flex-col gap-4 px-2">
          {selectedNode ? (
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary-100 text-primary">
                    {typeLabels[selectedNode.type]}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedNode.name}
                </h2>
                <p className="text-sm text-default-500 mt-2">
                  ID: {selectedNode.id}
                </p>
              </div>
              {currentChildLabel && (
                <div>
                  <Button
                    radius="sm"
                    size="sm"
                    variant="flat"
                    onPress={openAddModal}
                  >
                    Agregar {currentChildLabel}
                  </Button>
                </div>
              )}

              <Divider />

              {selectedNode.type === "machine" && (
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-foreground">
                    Equipos instalados
                  </h3>
                  <p className="text-sm text-default-500">
                    Esta máquina contiene {selectedNode.children?.length || 0}{" "}
                    equipos
                  </p>
                </div>
              )}

              {selectedNode.type === "equipment" && (
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-foreground">Subsistemas</h3>
                  <p className="text-sm text-default-500">
                    Este equipo tiene {selectedNode.children?.length || 0}{" "}
                    subsistemas
                  </p>
                </div>
              )}

              {selectedNode.type === "subsystem" && (() => {
                const subsystemNode = getNodeById(treeData, selectedNode.id);
                const preventive = subsystemNode?.preventive_activities ?? [];
                const pending = subsystemNode?.pending_activities ?? [];
                return (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-foreground">Componentes</h3>
                      <p className="text-sm text-default-500">
                        Este subsistema contiene{" "}
                        {selectedNode.children?.length || 0} componentes
                      </p>
                    </div>
                    <Divider />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-foreground">
                          Actividades preventivas
                        </h3>
                        <Button
                          radius="sm"
                          size="sm"
                          variant="flat"
                          onPress={() => openActivityModal("preventive_activities")}
                        >
                          Agregar actividad preventiva
                        </Button>
                      </div>
                      {preventive.length > 0 ? (
                        <Table aria-label="Actividades preventivas" removeWrapper>
                          <TableHeader>
                            <TableColumn>NOMBRE</TableColumn>
                            <TableColumn>FRECUENCIA</TableColumn>
                            <TableColumn>ULTIMA ACTIVIDAD</TableColumn>
                            <TableColumn>ESTADO</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {preventive.map((a) => (
                              <TableRow key={a.id}>
                                <TableCell>{a.name}</TableCell>
                                <TableCell>{a.frequency_months} mes(es)</TableCell>
                                <TableCell>{a.last_activity ? (a.last_activity) : "N/A"}</TableCell>
                                <TableCell>{a.completed ? "Completada" : "Pendiente"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        
                      ) : (
                        <p className="text-sm text-default-500">
                          No hay actividades preventivas. Agrégalas para planificar visitas.
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-foreground">
                          Actividades pendientes
                        </h3>
                        <Button
                          radius="sm"
                          size="sm"
                          variant="flat"
                          onPress={() => openActivityModal("pending_activities")}
                        >
                          Agregar actividad pendiente
                        </Button>
                      </div>
                      {pending.length > 0 ? (
                        <Table aria-label="Actividades pendientes" removeWrapper>
                          <TableHeader>
                            <TableColumn>NOMBRE</TableColumn>
                            <TableColumn>FRECUENCIA</TableColumn>
                            <TableColumn>ESTADO</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {pending.map((a) => (
                              <TableRow key={a.id}>
                                <TableCell>{a.name}</TableCell>
                                <TableCell>{a.frequency_months} mes(es)</TableCell>
                                <TableCell>{a.completed ? "Completada" : "Pendiente"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <p className="text-sm text-default-500">
                          No hay actividades pendientes.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })()}

              {selectedNode.type === "component" && (
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-foreground">Repuestos</h3>
                  {selectedNode.children && selectedNode.children.length > 0 ? (
                    <div className="space-y-2">
                      {selectedNode.children.map((part) => (
                        <div
                          key={part.id}
                          className="p-2 rounded border border-default-200"
                        >
                          <p className="text-sm font-medium text-foreground">
                            {part.name}
                          </p>
                          <p className="text-xs text-default-500">{part.id}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-default-500">
                      No hay repuestos asignados
                    </p>
                  )}
                </div>
              )}

              {selectedNode.type === "part" && (
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-foreground">
                    Información del Repuesto
                  </h3>
                  <p className="text-sm text-default-500">
                    ID del repuesto: {selectedNode.id}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-default-400">
              <p>Selecciona un elemento del árbol para ver sus detalles</p>
            </div>
          )}
        </section>
      </section>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar {currentChildLabel}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Nombre"
                  labelPlacement="outside"
                  radius="sm"
                  placeholder={
                    currentChildLabel
                      ? `Nombre del ${currentChildLabel}`
                      : "Nombre"
                  }
                  value={newChildName}
                  onValueChange={setNewChildName}
                />
              </ModalBody>
              <ModalFooter>
                <Button radius="sm" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  radius="sm"
                  color="primary"
                  onPress={() => {
                    handleConfirmAddChild();
                    onClose();
                  }}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {activityKind === "preventive_activities"
                  ? "Agregar actividad preventiva"
                  : "Agregar actividad pendiente"}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <Input
                  label="Nombre"
                  labelPlacement="outside"
                  radius="sm"
                  placeholder="Ej. Inspección visual, Cambio de rodamientos"
                  value={activityName}
                  onValueChange={setActivityName}
                />
                <Input
                  label="Frecuencia (meses)"
                  labelPlacement="outside"
                  radius="sm"
                  type="number"
                  min={1}
                  value={String(activityFrequencyMonths)}
                  onValueChange={(v) => setActivityFrequencyMonths(Number(v) || 12)}
                />
              </ModalBody>
              <ModalFooter>
                <Button radius="sm" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  radius="sm"
                  color="primary"
                  onPress={() => {
                    handleConfirmAddActivity();
                    onClose();
                  }}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
};

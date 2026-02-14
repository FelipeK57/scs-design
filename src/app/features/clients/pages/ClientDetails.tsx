import { useState } from "react";
import { Button, Card, CardBody, Divider } from "@heroui/react";
import {
  ChevronRight,
  ChevronDown,
  Box,
  Cpu,
  Zap,
  Package,
  ChevronLeft,
} from "lucide-react";
import { useParams, useNavigate } from "react-router";

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

interface TreeNode {
  id: string;
  name: string;
  type: "machine" | "equipment" | "subsystem" | "component" | "part";
  children?: TreeNode[];
}

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
        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
          selectedNode?.id === node.id
            ? "bg-blue-50 border-l-4 border-blue-600"
            : "hover:bg-gray-50"
        }`}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        onClick={() => onSelect(node)}
      >
        {hasChildren && (
          <Button
            disableRipple
            variant="light"
            isIconOnly
            onPress={() => {
              onToggle(node.id);
            }}
          >
            {isExpanded ? (
              <ChevronDown className="size-4 text-gray-600" />
            ) : (
              <ChevronRight className="size-4 text-gray-600" />
            )}
          </Button>
        )}
        {!hasChildren && <div className="size-4" />}
        <span className={getLevelColor(level)}>{getIcon(node.type)}</span>
        <span className="text-sm font-medium text-gray-700">{node.name}</span>
      </div>
      {hasChildren && isExpanded && (
        <div>
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
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const clientData =
    mockClientData[clientId as unknown as keyof typeof mockClientData];

  if (!clientData) {
    return (
      <main className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            variant="light"
            onPress={() => navigate("/clients")}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <h1 className="text-xl font-semibold">Cliente no encontrado</h1>
        </div>
      </main>
    );
  }

  // Build tree structure
  const treeData: TreeNode[] = clientData.machines.map((machine) => ({
    id: machine.id,
    name: machine.name,
    type: "machine" as const,
    children: machine.equipment.map((equip) => ({
      id: equip.id,
      name: equip.name,
      type: "equipment" as const,
      children: equip.subsystems.map((subsys) => ({
        id: subsys.id,
        name: subsys.name,
        type: "subsystem" as const,
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
      })),
    })),
  }));

  const handleToggle = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelect = (node: TreeNode) => {
    setSelectedNode(node);
  };

  return (
    <main className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-2">
        <Button isIconOnly variant="light" onPress={() => navigate("/clients")}>
          <ChevronLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold">{clientData.name}</h1>
          <p className="text-sm text-gray-500">
            Contrato: {clientData.contract}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tree Navigation */}
        <Card className="lg:col-span-1 p-4">
          <CardBody className="gap-0">
            <h2 className="font-semibold mb-4 text-gray-900">
              Estructura de Equipos
            </h2>
            <Divider className="mb-4" />
            <div className="flex flex-col gap-1 max-h-96 overflow-y-auto">
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
        <Card className="lg:col-span-2 p-4">
          <CardBody>
            {selectedNode ? (
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                      {selectedNode.type}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedNode.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    ID: {selectedNode.id}
                  </p>
                </div>

                <Divider />

                {selectedNode.type === "machine" && (
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-900">
                      Equipos instalados
                    </h3>
                    <p className="text-sm text-gray-600">
                      Esta máquina contiene {selectedNode.children?.length || 0}{" "}
                      equipos
                    </p>
                  </div>
                )}

                {selectedNode.type === "equipment" && (
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-900">Subsistemas</h3>
                    <p className="text-sm text-gray-600">
                      Este equipo tiene {selectedNode.children?.length || 0}{" "}
                      subsistemas
                    </p>
                  </div>
                )}

                {selectedNode.type === "subsystem" && (
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-900">Componentes</h3>
                    <p className="text-sm text-gray-600">
                      Este subsistema contiene{" "}
                      {selectedNode.children?.length || 0} componentes
                    </p>
                  </div>
                )}

                {selectedNode.type === "component" && (
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-900">Repuestos</h3>
                    {selectedNode.children &&
                    selectedNode.children.length > 0 ? (
                      <div className="space-y-2">
                        {selectedNode.children.map((part) => (
                          <div
                            key={part.id}
                            className="p-2 bg-gray-50 rounded border border-gray-200"
                          >
                            <p className="text-sm font-medium text-gray-900">
                              {part.name}
                            </p>
                            <p className="text-xs text-gray-500">{part.id}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">
                        No hay repuestos asignados
                      </p>
                    )}
                  </div>
                )}

                {selectedNode.type === "part" && (
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-900">
                      Información del Repuesto
                    </h3>
                    <p className="text-sm text-gray-600">
                      ID del repuesto: {selectedNode.id}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 text-gray-400">
                <p>Selecciona un elemento del árbol para ver sus detalles</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </main>
  );
};

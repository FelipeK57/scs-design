import { Chip, Divider } from "@heroui/react";
import { useParams, Link } from "react-router";

// Type definitions
interface PreventiveActivity {
  name: string;
  completed: boolean;
}

interface PendingActivity {
  name: string;
  reportedDate: string;
  completed: boolean;
}

interface ChecklistItem {
  task: string;
  completed: boolean;
}

interface BaseVisit {
  id: number;
  orderNumber: string;
  client: string;
  machine: string;
  responsible: string;
  status: string;
  date: string;
  duration: string;
  contractStatus: string;
  notes: string;
}

interface PreventiveVisit extends BaseVisit {
  visitType: "Mantenimiento";
  preventiveActivities: PreventiveActivity[];
  pendingActivities: PendingActivity[];
}

interface EmergencyVisit extends BaseVisit {
  visitType: "Emergencia";
  emergency: {
    initialProblem: string;
    previousActivities: string;
  };
}

interface AdditionalVisit extends BaseVisit {
  visitType: "Adicional";
  customChecklist: ChecklistItem[];
}

type VisitData = PreventiveVisit | EmergencyVisit | AdditionalVisit;

// Mock data
const mockVisitData: Record<number, VisitData> = {
  1: {
    id: 1,
    orderNumber: "OT-2024-001",
    client: "Empresa A",
    machine: "MP1 Cali",
    responsible: "Juan Pérez",
    visitType: "Mantenimiento",
    status: "Completada",
    date: "2024-06-15",
    duration: "3 días",
    contractStatus: "Activo",
    preventiveActivities: [
      { name: "Inspección visual de equipos", completed: true },
      { name: "Limpieza de componentes", completed: true },
      { name: "Calibración de instrumentos", completed: false },
      { name: "Verificación de seguridad", completed: true },
    ],
    pendingActivities: [
      {
        name: "Reparación de fallas",
        reportedDate: "2024-06-01",
        completed: true,
      },
      {
        name: "Sustitución de piezas",
        reportedDate: "2024-06-05",
        completed: false,
      },
    ],
    notes: "Mantenimiento preventivo completado exitosamente. Se reemplazaron filtros y se lubricaron componentes principales.",
  },
  2: {
    id: 2,
    orderNumber: "OT-2024-002",
    client: "Empresa B",
    machine: "MP2 Yumbo",
    responsible: "María Gómez",
    visitType: "Emergencia",
    status: "En Progreso",
    date: "2024-06-20",
    duration: "1 día",
    contractStatus: "Activo",
    emergency: {
      initialProblem:
        "El motor principal presenta vibraciones anormales y ruidos metálicos durante la operación. La temperatura del motor ha aumentado significativamente.",
      previousActivities:
        "Se realizó inspección visual sin encontrar daños externos. Se verificaron los niveles de lubricante y se encontraron dentro de rangos normales. Se revisó el balance del rotor sin encontrar irregularidades.",
    },
    notes: "Se continúa con el diagnóstico. Se requiere análisis de vibraciones especializado.",
  },
  3: {
    id: 3,
    orderNumber: "OT-2024-003",
    client: "Empresa C",
    machine: "MP3 Palmira",
    responsible: "Carlos López",
    visitType: "Adicional",
    status: "Pendiente",
    date: "2024-06-25",
    duration: "2 días",
    contractStatus: "No activo",
    customChecklist: [
      { task: "Revisión del sistema hidráulico", completed: false },
      { task: "Inspección de componentes eléctricos", completed: false },
      { task: "Verificación de sensores de temperatura", completed: false },
      { task: "Prueba de sistema de control", completed: false },
    ],
    notes: "Checklist solicitado por el cliente para auditoría interna.",
  },
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completada":
      return "success";
    case "En Progreso":
      return "warning";
    case "Pendiente":
      return "secondary";
    default:
      return "default";
  }
};

const getContractStatusColor = (status: string) => {
  return status === "Activo" ? "success" : "danger";
};

const isEmergency = (visit: VisitData): visit is EmergencyVisit =>
  visit.visitType === "Emergencia";

const isPreventive = (visit: VisitData): visit is PreventiveVisit =>
  visit.visitType === "Mantenimiento";

const isAdditional = (visit: VisitData): visit is AdditionalVisit =>
  visit.visitType === "Adicional";

export const VisitDetails = () => {
  const { visitId } = useParams();

  const visitData = mockVisitData[parseInt(visitId || "0", 10)];

  if (!visitData) {
    return (
      <main className="flex flex-col gap-8 pb-8 w-full">
        <article className="flex flex-col items-start gap-4">
          <Link to="/visits" className="text-xs border-b">
            Volver
          </Link>
          <h1 className="text-xl font-bold text-foreground">
            Visita no encontrada
          </h1>
        </article>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-8 pb-8">
      {/* Header Section */}
      <article className="flex flex-col items-start gap-4">
        <Link to="/visits" className="text-xs border-b">
          Volver
        </Link>
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-foreground">
              {visitData.orderNumber}
            </h1>
            <Chip
              color={getStatusColor(visitData.status) as any}
              variant="flat"
              size="sm"
            >
              {visitData.status}
            </Chip>
          </div>
          <p className="text-sm text-default-500 mt-1">
            Cliente: {visitData.client} · Máquina: {visitData.machine}
          </p>
        </div>
      </article>

      {/* Visit summary */}
      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">Resumen de la visita</h2>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Cliente
            </span>
            <p className="text-sm font-medium text-foreground">
              {visitData.client}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Máquina
            </span>
            <p className="text-sm font-medium text-foreground">
              {visitData.machine}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Responsable
            </span>
            <p className="text-sm font-medium text-foreground">
              {visitData.responsible}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Tipo de visita
            </span>
            <p className="text-sm font-medium text-foreground">
              {visitData.visitType}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Fecha
            </span>
            <p className="text-sm font-medium text-foreground">
              {visitData.date}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Duración
            </span>
            <p className="text-sm font-medium text-foreground">
              {visitData.duration}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-default-500 uppercase tracking-wide">
              Estado de contrato
            </span>
            <div className="flex items-center gap-2">
              <Chip
                color={getContractStatusColor(visitData.contractStatus) as any}
                variant="flat"
                size="sm"
              >
                {visitData.contractStatus}
              </Chip>
            </div>
          </div>
        </section>
      </section>

      
      <Divider />
      

      {/* Contenido según tipo de visita */}
      {isEmergency(visitData) && (
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">
            Detalles de la emergencia
          </h2>
          <section className="space-y-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-foreground">
                Problema inicial
              </h3>
              <p className="text-sm text-default-700 leading-relaxed">
                {visitData.emergency.initialProblem}
              </p>
            </div>
            <Divider />
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-foreground">
                Actividades previas (sin solución)
              </h3>
              <p className="text-sm text-default-700 leading-relaxed">
                {visitData.emergency.previousActivities}
              </p>
            </div>
          </section>
        </section>
      )}

      {isAdditional(visitData) && visitData.contractStatus === "No activo" && (
        <section className="space-y-4">
          <h2 className="font-semibold text-foreground">
            Checklist solicitado por el cliente
          </h2>
          <section className="flex flex-col gap-3">
            {visitData.customChecklist.map(
              (item: ChecklistItem, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded bg-content1"
                >
                  <span
                    className={`text-sm flex-1 ${
                      item.completed
                        ? "text-default-500 line-through"
                        : "text-foreground font-medium"
                    }`}
                  >
                    {item.task}
                  </span>
                </div>
              ),
            )}
          </section>
        </section>
      )}

      {isPreventive(visitData) && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Actividades preventivas */}
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold text-foreground">
                Actividades preventivas
              </h2>
              <Chip size="sm" variant="flat">
                {visitData.preventiveActivities.length}
              </Chip>
            </div>
            <div className="flex flex-col gap-3">
              {visitData.preventiveActivities.map(
                (activity: PreventiveActivity, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded bg-content1"
                  >
                    <span
                      className={`text-sm flex-1 ${
                        activity.completed
                          ? "text-default-500 line-through"
                          : "text-foreground font-medium"
                      }`}
                    >
                      {activity.name}
                    </span>
                  </div>
                ),
              )}
            </div>
          </section>

          {/* Actividades pendientes */}
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold text-foreground">
                Actividades pendientes
              </h2>
              <Chip size="sm" variant="flat" color="warning">
                {visitData.pendingActivities.length}
              </Chip>
            </div>
            <div className="flex flex-col gap-3">
              {visitData.pendingActivities.map(
                (activity: PendingActivity, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1 p-3 rounded bg-content1"
                  >
                    <span
                      className={`text-sm ${
                        activity.completed
                          ? "text-default-500 line-through"
                          : "text-foreground font-medium"
                      }`}
                    >
                      {activity.name}
                    </span>
                    <span className="text-xs text-default-400">
                      Reportado el: {activity.reportedDate}
                    </span>
                  </div>
                ),
              )}
            </div>
          </section>
        </section>
      )}

      <Divider />

      {/* Notas adicionales */}
      {visitData.notes && (
        <section className="space-y-3">
          <h2 className="font-semibold text-foreground">Notas adicionales</h2>
          <p className="text-sm text-default-700 leading-relaxed">
            {visitData.notes}
          </p>
        </section>
      )}
    </main>
  );
};

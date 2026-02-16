import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@heroui/react";
import {
  ChevronLeft,
  User,
  Calendar,
  Clock,
  AlertCircle,
  Mail,
  Phone,
} from "lucide-react";
import { useParams, useNavigate, Link } from "react-router";

// Mock data
const mockRemoteSupportData = {
  1: {
    id: 1,
    ticketNumber: "001",
    client: "Empresa A",
    technician: "Juan Pérez",
    issueType: "Soporte Técnico",
    status: "Completada",
    date: "2024-06-15",
    startTime: "10:00",
    duration: "45 min",
    requester: {
      name: "Carlos Martínez",
      email: "carlos.martinez@empresaa.com",
      phone: "+57 300 123 4567",
    },
    issue: {
      description:
        "El sistema de gestión de inventario presenta errores al intentar generar reportes mensuales. Los usuarios reportan que la aplicación se congela al hacer clic en el botón 'Generar Reporte' de manera repetida sin éxito por más de 5 intentos consecutivos sin obtener resultados.",
      solution:
        "Se identificó un problema de memoria en la consulta SQL que recupera los datos. Se optimizó la consulta agregando índices a las tablas relevantes y se implementó paginación en el servidor. Se realizó limpieza de caché del navegador y se reiniciaron los servicios del servidor de aplicaciones para corregir el problema de manera permanente por más de 5 intentos consecutivos sin obtener resultados.",
    },
  },
  2: {
    id: 2,
    ticketNumber: "TKT-2024-002",
    client: "Empresa B",
    technician: "María Gómez",
    issueType: "Configuración",
    status: "En Progreso",
    date: "2024-06-15",
    startTime: "14:30",
    duration: "60 min",
    requester: {
      name: "Ana López",
      email: "ana.lopez@empresab.com",
      phone: "+57 301 234 5678",
    },
    issue: {
      description:
        "Necesidad de configurar nuevos perfiles de usuario con permisos específicos para el departamento de contabilidad.",
      solution:
        "En proceso: Se están creando los roles personalizados en el sistema y configurando los permisos de acceso a los módulos financieros.",
    },
  },
};

export const RemoteSupportDetails = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const sessionData =
    mockRemoteSupportData[
      sessionId as unknown as keyof typeof mockRemoteSupportData
    ];

  if (!sessionData) {
    return (
      <main className="flex flex-col gap-4 w-full">
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            variant="light"
            onPress={() => navigate("/remote-support")}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <h1 className="text-xl font-semibold">Atención no encontrada</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-6 pb-8">
      {/* Header Section */}
      <article className="flex flex-row gap-3 items-center">
        <Link to="/remote-support" className="text-xs border-b">
          Volver
        </Link>
      </article>
      <h1 className="text-xl font-semibold text-foreground">
        Detalles de la atención remota: OT-{sessionData.ticketNumber}
      </h1>

      <section className="space-y-4">
        {/* Session Summary Card */}
        <h2 className="text-lg font-semibold text-foreground">
          Resumen de la sesión
        </h2>
        <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-default-500">
              <User className="size-4" />
              <span className="text-sm font-medium">Técnico</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {sessionData.technician}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-default-500">
              <AlertCircle className="size-4" />
              <span className="text-sm font-medium">Tipo de problema</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {sessionData.issueType}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-default-500">
              <Calendar className="size-4" />
              <span className="text-sm font-medium">Fecha</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {sessionData.date}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-default-500">
              <Clock className="size-4" />
              <span className="text-sm font-medium">Duración</span>
            </div>
            <p className="text-base font-semibold text-foreground">
              {sessionData.duration} (inicio: {sessionData.startTime})
            </p>
          </div>
        </article>
      </section>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requester Info Card */}
        <Card radius="sm" shadow="sm" className="border-1 border-default-200 h-fit p-4 lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-semibold text-foreground">
              Quien solicitó
            </h2>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-default-500">
                <User className="size-4" />
                <span className="text-sm font-medium">Nombre</span>
              </div>
              <p className="text-base text-foreground">
                {sessionData.requester.name}
              </p>
            </div>

            <Divider />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-default-500">
                <Mail className="size-4" />
                <span className="text-sm font-medium">Correo</span>
              </div>
              <p className="text-base text-foreground break-all">
                {sessionData.requester.email}
              </p>
            </div>

            <Divider />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-default-500">
                <Phone className="size-4" />
                <span className="text-sm font-medium">Teléfono</span>
              </div>
              <p className="text-base text-foreground">
                {sessionData.requester.phone}
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Issue Details Card */}
        <section className="space-y-4 lg:col-span-2">
            <h2 className="text-lg font-semibold text-foreground">
              Detalles de la atención
            </h2>
            <div className="flex flex-col gap-5">
              {/* Problem Description */}
              <div className="flex flex-col gap-3">
                <h3 className="text-base font-semibold text-foreground">
                  Problema reportado
                </h3>
                <div className="pl-5">
                  <p className="text-sm text-default-700 leading-relaxed">
                    {sessionData.issue.description}
                  </p>
                </div>
              </div>

              <Divider />

              {/* Solution Applied */}
              <div className="flex flex-col gap-3">
                <h3 className="text-base font-semibold text-foreground">
                  Solución aplicada
                </h3>
                <div className="pl-5">
                  <p className="text-sm text-default-700 leading-relaxed">
                    {sessionData.issue.solution}
                  </p>
                </div>
              </div>
            </div>
        </section>
      </div>
    </main>
  );
};

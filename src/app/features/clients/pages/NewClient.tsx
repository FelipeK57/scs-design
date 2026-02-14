import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  cn,
  Input,
  Switch,
} from "@heroui/react";
import {
  ChevronLeft,
  Building2,
  Plus,
  Trash2,
  Mail,
  Phone,
  MapPin,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface Equipo {
  id: string;
  nombre_equipo: string;
}

interface Maquina {
  id: string;
  nombre: string;
  ciudad: string;
  contacto: string;
  correo: string;
  telefono: string;
  contrato_abierto: boolean;
  equipos: Equipo[];
}

export const NewClient = () => {
  const [clienteName, setClienteName] = useState("");
  const [maquinas, setMaquinas] = useState<Maquina[]>([
    {
      id: "1",
      nombre: "",
      ciudad: "",
      contacto: "",
      correo: "",
      telefono: "",
      contrato_abierto: false,
      equipos: [{ id: "1", nombre_equipo: "" }],
    },
  ]);

  const addMaquina = () => {
    const newMaquina: Maquina = {
      id: Date.now().toString(),
      nombre: "",
      ciudad: "",
      contacto: "",
      correo: "",
      telefono: "",
      contrato_abierto: false,
      equipos: [{ id: Date.now().toString(), nombre_equipo: "" }],
    };
    setMaquinas([...maquinas, newMaquina]);
  };

  const removeMaquina = (maquinaId: string) => {
    setMaquinas(maquinas.filter((m) => m.id !== maquinaId));
  };

  const updateMaquina = (
    maquinaId: string,
    field: keyof Maquina,
    value: any,
  ) => {
    setMaquinas(
      maquinas.map((m) => (m.id === maquinaId ? { ...m, [field]: value } : m)),
    );
  };

  const addEquipo = (maquinaId: string) => {
    setMaquinas(
      maquinas.map((m) => {
        if (m.id === maquinaId) {
          const newEquipo: Equipo = {
            id: Date.now().toString(),
            nombre_equipo: "",
          };
          return { ...m, equipos: [...m.equipos, newEquipo] };
        }
        return m;
      }),
    );
  };

  const removeEquipo = (maquinaId: string, equipoId: string) => {
    setMaquinas(
      maquinas.map((m) => {
        if (m.id === maquinaId) {
          return {
            ...m,
            equipos: m.equipos.filter((e) => e.id !== equipoId),
          };
        }
        return m;
      }),
    );
  };

  const updateEquipo = (
    maquinaId: string,
    equipoId: string,
    nombre_equipo: string,
  ) => {
    setMaquinas(
      maquinas.map((m) => {
        if (m.id === maquinaId) {
          return {
            ...m,
            equipos: m.equipos.map((e) =>
              e.id === equipoId ? { ...e, nombre_equipo } : e,
            ),
          };
        }
        return m;
      }),
    );
  };

  return (
    <main className="flex flex-col gap-6 pb-8">
      {/* Header Section */}
      <article className="flex flex-row gap-3 items-center">
        <Button
          as={Link}
          to="/clients"
          isIconOnly
          variant="light"
          size="lg"
          className="hover:bg-default-100"
        >
          <ChevronLeft className="size-6" />
        </Button>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-foreground">Nuevo Cliente</h1>
          <p className="text-sm text-default-500">
            Crea un cliente con sus máquinas y equipos asociados
          </p>
        </div>
      </article>

      {/* Client Info Card */}
      <Card className="shadow-small p-4">
        <CardHeader>
          <h2 className="text-lg font-semibold text-foreground">
            Información del Cliente
          </h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          <Input
            label="Nombre del cliente"
            labelPlacement="outside"
            variant="bordered"
            placeholder="Ingresa el nombre del cliente"
            value={clienteName}
            onValueChange={setClienteName}
            startContent={<User className="size-4 text-default-400" />}
            isRequired
          />
        </CardBody>
      </Card>

      {/* Machines Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">Máquinas</h2>
            <Chip size="sm" variant="flat">
              {maquinas.length}
            </Chip>
          </div>
          <Button
            color="primary"
            variant="flat"
            startContent={<Plus className="size-4" />}
            onPress={addMaquina}
          >
            Agregar máquina
          </Button>
        </div>

        {maquinas.map((maquina, maquinaIndex) => (
          <Card
            key={maquina.id}
            className="shadow-small p-4"
          >
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <h3 className="text-md font-semibold text-foreground">
                  Máquina #{maquinaIndex + 1}
                </h3>
                {maquinas.length > 1 && (
                  <Button
                    isIconOnly
                    size="sm"
                    color="danger"
                    variant="flat"
                    onPress={() => removeMaquina(maquina.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardBody className="flex flex-col gap-5">
              {/* Machine Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre de la máquina"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Ingresa el nombre"
                  value={maquina.nombre}
                  onValueChange={(value) =>
                    updateMaquina(maquina.id, "nombre", value)
                  }
                  startContent={
                    <Building2 className="size-4 text-default-400" />
                  }
                  isRequired
                />
                <Input
                  label="Ciudad"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Ingresa la ciudad"
                  value={maquina.ciudad}
                  onValueChange={(value) =>
                    updateMaquina(maquina.id, "ciudad", value)
                  }
                  startContent={<MapPin className="size-4 text-default-400" />}
                  isRequired
                />
                <Input
                  label="Contacto"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Nombre del contacto"
                  value={maquina.contacto}
                  onValueChange={(value) =>
                    updateMaquina(maquina.id, "contacto", value)
                  }
                  startContent={<User className="size-4 text-default-400" />}
                  isRequired
                />
                <Input
                  label="Correo electrónico"
                  labelPlacement="outside"
                  variant="bordered"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={maquina.correo}
                  onValueChange={(value) =>
                    updateMaquina(maquina.id, "correo", value)
                  }
                  startContent={<Mail className="size-4 text-default-400" />}
                  isRequired
                />
                <Input
                  label="Teléfono"
                  labelPlacement="outside"
                  variant="bordered"
                  type="tel"
                  placeholder="+57 300 123 4567"
                  value={maquina.telefono}
                  onValueChange={(value) =>
                    updateMaquina(maquina.id, "telefono", value)
                  }
                  startContent={<Phone className="size-4 text-default-400" />}
                  isRequired
                />
                <div className="flex items-end">
                  <Switch
                    isSelected={maquina.contrato_abierto}
                    onValueChange={(value) =>
                      updateMaquina(maquina.id, "contrato_abierto", value)
                    }
                    className="mb-2"
                    size="sm"
                  >
                    Contrato abierto
                  </Switch>
                </div>
              </div>

              {/* Equipment Section */}
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-foreground">
                      Equipos de esta máquina
                    </h4>
                    <Chip size="sm" variant="flat">
                      {maquina.equipos.length}
                    </Chip>
                  </div>
                  <Button
                    size="sm"
                    variant="flat"
                    startContent={<Plus className="size-3" />}
                    onPress={() => addEquipo(maquina.id)}
                  >
                    Agregar equipo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {maquina.equipos.map((equipo, equipoIndex) => (
                    <div
                      key={equipo.id}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-lg border-2 border-default-200",
                        "bg-content1 hover:bg-content2 transition-colors",
                      )}
                    >
                      <Input
                        variant="bordered"
                        placeholder={`Equipo #${equipoIndex + 1}`}
                        value={equipo.nombre_equipo}
                        onValueChange={(value) =>
                          updateEquipo(maquina.id, equipo.id, value)
                        }
                        size="sm"
                        classNames={{
                          inputWrapper: "border-none shadow-none",
                        }}
                      />
                      {maquina.equipos.length > 1 && (
                        <Button
                          isIconOnly
                          size="sm"
                          color="danger"
                          variant="light"
                          onPress={() => removeEquipo(maquina.id, equipo.id)}
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="flat" size="lg" className="font-medium">
          Cancelar
        </Button>
        <Button
          color="primary"
          size="lg"
          className="font-medium"
        >
          Crear cliente
        </Button>
      </div>
    </main>
  );
};

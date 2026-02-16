import { Button, Chip, Divider, Input, Switch } from "@heroui/react";
import { Plus, Trash2, X } from "lucide-react";
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
    <main className="flex flex-col gap-8 pb-8">
      {/* Header Section */}
      <article className="flex flex-col items-start gap-4">
        <Link to="/clients" className="text-xs border-b">
          Volver
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">Nuevo Cliente</h1>
          <p className="text-sm text-default-500">
            Crea un cliente con sus máquinas y equipos asociados
          </p>
        </div>
      </article>

      {/* Client Info Section */}
      <section className="space-y-4">
        <h2 className="font-semibold text-foreground">
          1. Información del cliente
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Input
            radius="sm"
            label="Nombre del cliente"
            labelPlacement="outside"
            placeholder="Ingresa el nombre del cliente"
            value={clienteName}
            onValueChange={setClienteName}
            isRequired
          />
        </section>
      </section>

      <Divider />

      {/* Machines Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between sticky -top-8 bg-background z-50 py-1">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-foreground">
              2. Máquinas y equipos
            </h2>
            <Chip variant="flat">
              {maquinas.length}
            </Chip>
          </div>
          <Button
            radius="sm"
            variant="flat"
            startContent={<Plus className="size-4" />}
            onPress={addMaquina}
          >
            Agregar máquina
          </Button>
        </div>

        <section className="flex flex-col gap-4">
          {maquinas.map((maquina, maquinaIndex) => (
            <section key={maquina.id} className="space-y-4">
              <header className="flex items-center justify-between w-full">
                <h3 className="text-md font-semibold text-foreground">
                  Máquina #{maquinaIndex + 1}
                </h3>
                {maquinas.length > 1 && (
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onPress={() => removeMaquina(maquina.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </header>

              {/* Machine Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  radius="sm"
                  label="Nombre de la máquina"
                  labelPlacement="outside"
                  placeholder="Ingresa el nombre"
                  value={maquina.nombre}
                  onValueChange={(value) =>
                    updateMaquina(maquina.id, "nombre", value)
                  }
                  isRequired
                />
                <Input
                  radius="sm"
                  label="Ciudad"
                  labelPlacement="outside"
                  placeholder="Ingresa la ciudad"
                  value={maquina.ciudad}
                  onValueChange={(value) =>
                    updateMaquina(maquina.id, "ciudad", value)
                  }
                  isRequired
                />
                <Input
                  radius="sm"
                  label="Contacto"
                  labelPlacement="outside"
                  placeholder="Nombre del contacto"
                  value={maquina.contacto}
                  onValueChange={(value) =>
                    updateMaquina(maquina.id, "contacto", value)
                  }
                  isRequired
                />
                <Input
                  radius="sm"
                  label="Correo electrónico"
                  labelPlacement="outside"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={maquina.correo}
                  onValueChange={(value) =>
                    updateMaquina(maquina.id, "correo", value)
                  }
                  isRequired
                />
                <Input
                  radius="sm"
                  label="Teléfono"
                  labelPlacement="outside"
                  type="tel"
                  placeholder="+57 300 123 4567"
                  value={maquina.telefono}
                  onValueChange={(value) =>
                    updateMaquina(maquina.id, "telefono", value)
                  }
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
                    <h4 className="font-semibold text-foreground">
                      Equipos de esta máquina
                    </h4>
                    <Chip variant="flat">
                      {maquina.equipos.length}
                    </Chip>
                  </div>
                  <Button
                    radius="sm"
                    variant="flat"
                    startContent={<Plus className="size-3" />}
                    onPress={() => addEquipo(maquina.id)}
                  >
                    Agregar equipo
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {maquina.equipos.map((equipo, equipoIndex) => (
                    <div key={equipo.id}>
                      <Input
                        radius="sm"
                        placeholder={`Equipo #${equipoIndex + 1}`}
                        value={equipo.nombre_equipo}
                        onValueChange={(value) =>
                          updateEquipo(maquina.id, equipo.id, value)
                        }
                        endContent={
                          maquina.equipos.length > 1 && (
                            <button
                              className="p-2 rounded-full hover:bg-default transition-colors"
                              onClick={() =>
                                removeEquipo(maquina.id, equipo.id)
                              }
                            >
                              <X className="size-3" />
                            </button>
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              {maquinas.length > 1 && maquinaIndex < maquinas.length - 1 && (
                <Divider />
              )}
            </section>
          ))}
        </section>
      </section>

      {/* Action Buttons */}
      <section className="flex flex-row justify-end gap-4">
        <Button radius="sm" variant="light">
          Cancelar
        </Button>
        <Button radius="sm" color="primary">
          Crear cliente
        </Button>
      </section>
    </main>
  );
};

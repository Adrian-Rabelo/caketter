import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../../services/API";
import { Modal } from "../../../components/Modal";
import { Notification } from "../../../utils/Notification";
import { ConfirmButton } from "../../../components/ConfirmButton";
import { useAuth } from "../../../context/AuthContext";
import InputMask from "react-input-mask";

interface CostumerProps {
  id: number;
}

interface Costumer {
  name: string;
  contact: string;
  email: string;
  street: string;
  neighborhood: string;
  number: string;
  user_uuid: string;
}

export function UpdateCostumer({ id }: CostumerProps) {
  const { user } = useAuth();
  const userUuid = user?.uuid;
  const { register, handleSubmit, setValue } = useForm<Costumer>();

  const onSubmit = (fn: () => void) => {
    const submit: SubmitHandler<Costumer> = async (data) => {
      try {
        await api.put(`costumer/${id}`, {
          name: data.name,
          contact: data.contact,
          email: data.email,
          street: data.street,
          neighborhood: data.neighborhood,
          number: data.number,
          user_uuid: userUuid,
        });
        Notification.fire({
          icon: "success",
          title: "Cliente atualizado com sucesso!",
        });
        window.location.reload(), 4000;
        fn();
      } catch (err: any) {
        Notification.fire({
          icon: "error",
          title: err.message,
        });
      }
    };
    return submit;
  };

  const loadData = () => {
    api.get<Costumer>(`costumer/${id}`).then((res) => {
      setValue("name", res.data.name);
      setValue("contact", res.data.contact);
      setValue("email", res.data.email);
      setValue("street", res.data.street);
      setValue("neighborhood", res.data.neighborhood);
      setValue("number", res.data.number);
    });
  };

  return (
    <Modal onOpen={loadData}>
      {({ handleCloseModal }) => {
        return (
          <>
            <div className="max-w-5xl mx-auto bg-white p-16">
              <form onSubmit={handleSubmit(onSubmit(handleCloseModal))}>
                <div className="grid xl:grid-cols-2 xl:gap-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Nome
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Contato
                    </label>
                    <InputMask
                      mask="(99) 99999-9999"
                      required
                      {...register("contact")}
                      type="text"
                      placeholder="(  ) _____-____"
                      className="g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    ></InputMask>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 items-start">
                    <div className="col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Avenida
                      </label>
                      <input
                        {...register("street")}
                        type="text"
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Número
                      </label>
                      <input
                        {...register("number")}
                        type="number"
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <div className="w-full max-w-sm">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Bairro
                      </label>
                      <input
                        {...register("neighborhood")}
                        type="text"
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <ConfirmButton crud={true} text="Confirmar" />
                </div>
              </form>
            </div>
          </>
        );
      }}
    </Modal>
  );
}

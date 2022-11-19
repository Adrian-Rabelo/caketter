import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../../../services/API";
import { Modal } from "../../../components/Modal";
import { Notification } from "../../../utils/Notification";

interface CakeProps {
  id: number;
}

interface Cake {
  dough: string;
  filling: string;
  size: number;
  theme: string;
  name_top: string;
  age_top: string;
}

export function UpdateCake({ id }: CakeProps) {
  const { register, handleSubmit, setValue } = useForm<Cake>();

  const onSubmit = (fn: () => void) => {
    const submit: SubmitHandler<Cake> = async (data) => {
      try {
        await api.put(`cake/edit/${id}`, {
          dough: data.dough,
          filling: data.filling,
          size: data.size,
          theme: data.theme,
          name_top: data.name_top,
          age_top: data.age_top,
        });
        Notification.fire({
          icon: "success",
          title: "Bolo alterado com sucesso!",
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
    api.get<Cake>(`cake/${id}`).then((res) => {
      setValue("dough", res.data.dough);
      setValue("filling", res.data.filling);
      setValue("size", res.data.size);
      setValue("theme", res.data.theme);
      setValue("name_top", res.data.name_top);
      setValue("age_top", res.data.age_top);
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
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Massa
                    </label>
                    <input
                      {...register("dough")}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Recheio
                    </label>
                    <input
                      {...register("filling")}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Tamanho
                    </label>
                    <input
                      {...register("size", {
                        setValueAs: v => parseFloat(v)
                      })}
                      type="number"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Tema
                    </label>
                    <input
                      {...register("theme")}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Nome no topo
                    </label>
                    <input
                      {...register("name_top")}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                      Idade
                    </label>
                    <input
                      {...register("age_top")}
                      type="text"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <button className="w-full h-full text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </>
        );
      }}
    </Modal>
  );
}

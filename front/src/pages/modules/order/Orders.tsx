import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../services/API";
import { formatDate } from "../../../utils/formatDate";

interface Costumer {
  id: number;
  name: string;
  contact: string;
  created_at: Date;
  updated_at: Date;
}
interface Cake {
  id: number;
  dough: string;
  filling: string;
  size: number;
  theme: string;
  name_top: string;
  age_top: string;
  created_at: Date;
  updated_at: Date;
}
interface Order {
  id: number;
  id_costumer: number;
  id_cake: number;
  price: number;
  cake: Cake;
  costumer: Costumer;
  delivery_date: Date;
  created_at: Date;
  updated_at: Date;
}
export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [value, setValue] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    api.get(`orders`).then((res) => {
      setOrders(res.data);
    });
  }, []);
  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/order/create")}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Novo pedido
      </button>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 text-center">
                #
              </th>
              <th scope="col" className="py-3 px-6">
                Bolo
              </th>
              <th scope="col" className="py-3 px-6">
                Cliente
              </th>
              <th scope="col" className="py-3 px-6">
                Data de criação
              </th>
              <th scope="col" className="py-3 px-6">
                Última alteração
              </th>
              <th scope="col" className="py-3 px-6"></th>
              <th scope="col" className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr
                  key={order.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{order.id}</td>
                  <td className="py-4 px-6">
                    <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                      <thead>
                        <tr>
                          <th scope="col" className="py-2 px-1">
                            Massa
                          </th>
                          <th scope="col" className="py-2 px-1">
                            Recheio
                          </th>
                          <th scope="col" className="py-2 px-1">
                            Tamanho
                          </th>
                          <th scope="col" className="py-2 px-1">
                            Nome no topo
                          </th>
                          <th scope="col" className="py-2 px-1">
                            Idade
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr>
                          <td className="py-4 px-1">{order.cake.dough}</td>
                          <td className="py-4 px-1">{order.cake.filling}</td>
                          <td className="py-4 px-1">{order.cake.size}</td>
                          <td className="py-4 px-1">{order.cake.name_top}</td>
                          <td className="py-4 px-1">{order.cake.age_top}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className="py-4 px-6">
                    <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                      <thead>
                        <tr>
                          <th scope="col" className="py-2 px-1">
                            Nome
                          </th>
                          <th scope="col" className="py-2 px-1">
                            Contato
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr>
                          <td className="py-4 px-1">{order.costumer.name}</td>
                          <td className="py-4 px-1">
                            {order.costumer.contact}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className="py-4 px-6">{formatDate(order.created_at)}</td>
                  <td className="py-4 px-6">{formatDate(order.updated_at)}</td>
                  <td className="py-4 px-1">edit</td>
                  <td className="py-4 px-1">
                    <button
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      EXCLUIR
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

import { useSelector } from "react-redux";
import { useStudents } from "../../contextPractice";
function Customer() {
  const customer = useSelector((store) => store.customer.fullName);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;

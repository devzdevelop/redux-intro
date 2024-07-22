import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

const studentsContext = createContext();

const initialState = {
  name: "Alecia Plunket",
};

function reducer(state, action) {
  switch (action.type) {
    case "student/changeName":
      return {
        ...state,
        name: action.payload,
      };
    default:
      return console.log("Unknown action type");
  }
}

function StudentsProvider({ children }) {
  const [{ name }, dispatch] = useReducer(reducer, initialState);

  // eslint-disable-next-line no-unused-vars
  const [students, setStudents] = useState([
    { studentName: "George Fling", gender: "female" },
    { studentName: "Alex Rose", gender: "male" },
  ]);

  useEffect(
    function () {
      setStudents((prev) => {
        return prev.map((student, index) => {
          if (index === 0) {
            return { ...student, studentName: name };
          }
          return student;
        });
      });
    },
    [name]
  );

  const data = useMemo(
    function () {
      return { students, dispatch };
    },
    [students]
  );
  return (
    <studentsContext.Provider value={data}>{children}</studentsContext.Provider>
  );
}

function useStudents() {
  const context = useContext(studentsContext);
  console.log(context);
  if (context === undefined)
    throw new Error("Context is being use outside StudentsProvider");
  return context;
}

export { StudentsProvider, useStudents };

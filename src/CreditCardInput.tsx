import React, { useEffect, useState } from "react";
import cardValidator from "card-validator";
import classnames from "classnames";
import { useForm } from "react-hook-form";

interface IProps {
  onSubmitForm: (data: any) => void;
}

interface IFormData {
  ccHolder: string;
  ccNumber: string;
  ccCVV: string;
}

interface ICardCode {
  name: string;
  size: number;
}

interface ICard {
  type: ICardType;
  code: ICardCode;
  isValid: boolean;
}

type ICardType = "visa" | "mastercard";

const CreditCardInput: React.FunctionComponent<IProps> = ({ onSubmitForm }) => {
  const [card, setCard] = useState<ICard>();
  const [validCardCode, setValidCardCode] = useState<boolean>();
  const { handleSubmit, register, watch } = useForm<IFormData>();

  const onCCNumberChange = (ccNumber: string) => {
    const valid = cardValidator.number(ccNumber);
    if (!valid.isPotentiallyValid || !valid.isValid || !ccNumber.length) {
      setCard(undefined);
    }

    if (valid.card && valid.isPotentiallyValid) {
      setCard({
        type: valid.card.type as ICardType,
        code: valid.card.code,
        isValid: valid.isValid,
      });
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "ccNumber" && value.ccNumber) {
        onCCNumberChange(value.ccNumber);
      }
      if (name === "ccCVV" && value.ccCVV) {
        onCVVChange(value.ccCVV);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onCVVChange = (ccCVV: string) => {
    if (ccCVV && ccCVV.length > 0 && card) {
      const validCVV = cardValidator.cvv(ccCVV, card.code.size);
      if (validCVV.isPotentiallyValid && validCVV.isValid) {
        setValidCardCode(true);
      } else {
        setValidCardCode(false);
      }
    }
  };

  const onSubmit = (data: any) => {
    onSubmitForm(data);
  };

  return (
    <div className="flex items-center flex-col">
      <div className="w-80 px-4 py-20">
        <h1 className={"text-3xl font-bold underline"}>Credit Card Input</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Credit card holder <br />
              <input
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                type="text"
                {...register("ccHolder")}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Credit Card Number <br />
              <span
                className={classnames({
                  "text-gray-400": card?.type !== "visa",
                  "text-gray-900": card?.type === "visa",
                })}
              >
                <i className="fa-brands fa-cc-visa" />
              </span>
              &nbsp;
              <span
                className={classnames({
                  "text-gray-400": card?.type !== "mastercard",
                  "text-gray-900": card?.type === "mastercard",
                })}
              >
                <i className="fa-brands fa-cc-mastercard" />
              </span>
              &nbsp;
              <input
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                type="text"
                {...register("ccNumber")}
              />
            </label>
          </div>
          <div>
            <label className={"block text-sm font-medium text-gray-700"}>
              {card?.code.name || "CVV"} ({card?.code.size || "3"} digit
              security code) <br />
              <input
                className={classnames([
                  "mt-1 block w-full shadow-sm sm:text-sm rounded-md",
                  {
                    "focus:ring-red-500 focus:border-red-500 border-red-300":
                      !validCardCode,
                    "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300":
                      validCardCode,
                  },
                ])}
                type="text"
                {...register("ccCVV")}
                disabled={!card || !card.isValid}
              />
            </label>
          </div>
          <button
            className={classnames([
              " text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-purple-800 transition duration-300",
              {
                "bg-purple-600": card?.isValid && validCardCode,
                "bg-gray-300": !card?.isValid || !validCardCode,
              },
            ])}
            type="submit"
            disabled={!card?.isValid || !validCardCode}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreditCardInput;

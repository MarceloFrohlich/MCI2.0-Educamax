'use client'

import React, {
    useEffect,
    useState,
} from "react";

import { Button } from "../../../components/ui/button";
import GlobalDialog from "../utils/globalDialog";
import FormSubmitButton from "../utils/formSubmitButton";

import {
    IGame,
    IPrevidenciaForm
} from "../../types/centralMCI/centralMCI";

import { VscGraph } from "react-icons/vsc";

import {
    createPrevidenciaAction,
    deletePrevidenciaAction,
    updatePrevidenciaAction
} from "../../actions/jogos/jogos";

import { useServerAction } from "../../hooks/useServerAction";
import DeleteModal from "../utils/deleteModal";
import ErroCampo from "../utils/erroCampo";
import { medidaSchema } from "../../schemas/centralmci";

interface ICreateEditPrevidenciaProps {
    game: IGame;
}

const createEmptyMeasure =
    (): IPrevidenciaForm => ({
        id_previdencia: '',
        verbo: "",
        unidade_medida: "",
        placar_desejado: 0,
        data_inicio: "",
        data_fim: "",
        excluir_periodo: false,
        inativo_de: "",
        inativo_ate: "",
    });

const CreateEditPrevidencia: React.FC<
    ICreateEditPrevidenciaProps
> = ({
    game,
}) => {

        const createAction =
            useServerAction(
                createPrevidenciaAction
            );

        const updateAction =
            useServerAction(
                updatePrevidenciaAction
            );

        const [
            open,
            setOpen,
        ] = useState(false);

        const [
            selectedIndex,
            setSelectedIndex,
        ] = useState(0);

        const [
            formData,
            setFormData,
        ] = useState<IPrevidenciaForm>(
            createEmptyMeasure()
        );

        const [
            erros,
            setErros,
        ] = useState<Record<string, string>>({});

        useEffect(() => {

            const currentMeasure =
                game.previdencias?.[
                selectedIndex
                ];

            if (currentMeasure) {

                setFormData({
                    ...createEmptyMeasure(),
                    ...currentMeasure,
                });

                return;
            }

            setFormData(
                createEmptyMeasure()
            );

        }, [
            selectedIndex,
            game.previdencias
        ]);

        useEffect(() => {

            if (
                createAction.state.success ||
                updateAction.state.success
            ) {

                setOpen(false);

            }

        }, [
            createAction.state.success,
            updateAction.state.success
        ]);

        const handleChange = (
            field: keyof IPrevidenciaForm,
            value:
                | string
                | number
                | boolean
        ) => {

            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));

        };

        // valida o estado controlado antes da server action
        const validar = (
            e: React.FormEvent<HTMLFormElement>
        ) => {

            const resultado = medidaSchema.safeParse({
                ...formData,
                placar_desejado: String(formData.placar_desejado ?? ''),
                data_inicio: formData.data_inicio ?? '',
                data_fim: formData.data_fim ?? '',
                inativo_de: formData.inativo_de ?? '',
                inativo_ate: formData.inativo_ate ?? '',
            });

            if (resultado.success) {
                setErros({});
                return;
            }

            e.preventDefault();

            const novos: Record<string, string> = {};

            resultado.error.issues.forEach((issue) => {
                const campo = String(issue.path[0] ?? '');
                if (!novos[campo]) novos[campo] = issue.message;
            });

            setErros(novos);

        };

        const isUpdate =
            !!formData.id_previdencia;

        const pending =
            createAction.pending ||
            updateAction.pending;

        const formAction =
            isUpdate
                ? updateAction.formAction
                : createAction.formAction;

        return (

            <GlobalDialog
                open={open}
                onOpenChange={setOpen}
                title="Gerenciar Previdências"
                contentClassName="sm:max-w-2xl"
                trigger={
                    <Button
                        type="button"
                        className="
                        bg-transparent
                        hover:bg-transparent
                        shadow-none
                        p-0
                        hover:cursor-pointer
                    "
                    >
                        <VscGraph
                            className="
                            text-(--textBaseColor)
                            size-5
                        "
                        />
                    </Button>
                }
            >

                <form
                    action={formAction}
                    onSubmit={validar}
                    noValidate
                    className="
                    flex
                    flex-col
                    gap-4
                "
                >

                    <input
                        type="hidden"
                        name="id"
                        value={
                            formData.id_previdencia
                        }
                    />

                    <input
                        type="hidden"
                        name="id_jogo"
                        value={game.id_jogo}
                    />

                    <input
                        type="hidden"
                        name="measure"
                        value={JSON.stringify(
                            formData
                        )}
                    />

                    <div className="grid grid-cols-3 gap-2 pt-2">

                        {[0, 1, 2].map(
                            (index) => {

                                const current =
                                    game.previdencias?.[
                                    index
                                    ];

                                return (

                                    <Button
                                        key={index}
                                        type="button"
                                        variant={
                                            selectedIndex === index
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() =>
                                            setSelectedIndex(index)
                                        }
                                        className={`
                                                    truncate
                                                    hover:cursor-pointer
                                                    ${!current &&
                                                selectedIndex !== index
                                                ? "bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
                                                : ""
                                            }
                                            `}
                                    >
                                        {current?.verbo ??
                                            `Nova Medida ${index + 1}`}
                                    </Button>

                                );

                            }
                        )}

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="flex flex-col gap-2">

                            <label>
                                Verbo
                            </label>

                            <input
                                value={
                                    formData.verbo
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "verbo",
                                        e.target.value
                                    )
                                }
                                className="
                                bg-white
                                rounded-xl
                                py-2
                                px-4
                                border-2
                                border-(--textBaseColor)/50
                            "
                            />

                        </div>

                        <div className="flex flex-col gap-2">

                            <label>
                                Unidade de Medida
                            </label>

                            <input
                                value={
                                    formData.unidade_medida
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "unidade_medida",
                                        e.target.value
                                    )
                                }
                                className="
                                bg-white
                                rounded-xl
                                py-2
                                px-4
                                border-2
                                border-(--textBaseColor)/50
                            "
                            />

                        </div>

                    </div>

                    <div className="flex flex-col gap-2">

                        <label>
                            Placar Desejado
                        </label>

                        <input
                            type="number"
                            value={
                                formData.placar_desejado
                            }
                            onChange={(e) =>
                                handleChange(
                                    "placar_desejado",
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                            className="
                            bg-white
                            rounded-xl
                            py-2
                            px-4
                            border-2
                            border-(--textBaseColor)/50
                        "
                        />

                        <ErroCampo erro={erros.placar_desejado} />

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="flex flex-col gap-2">

                            <input
                                type="date"
                                value={
                                    formData.data_inicio
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "data_inicio",
                                        e.target.value
                                    )
                                }
                                className="
                                bg-white
                                rounded-xl
                                py-2
                                px-4
                                border-2
                                border-(--textBaseColor)/50
                            "
                            />

                            <ErroCampo erro={erros.data_inicio} />

                        </div>

                        <div className="flex flex-col gap-2">

                            <input
                                type="date"
                                value={
                                    formData.data_fim
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "data_fim",
                                        e.target.value
                                    )
                                }
                                className="
                                bg-white
                                rounded-xl
                                py-2
                                px-4
                                border-2
                                border-(--textBaseColor)/50
                            "
                            />

                            <ErroCampo erro={erros.data_fim} />

                        </div>

                    </div>

                    <div className="flex items-center gap-2">

                        <input
                            type="checkbox"
                            checked={
                                formData.excluir_periodo
                            }
                            onChange={(e) =>
                                handleChange(
                                    "excluir_periodo",
                                    e.target.checked
                                )
                            }
                            className="size-5"
                        />

                        <label>
                            Excluir período
                        </label>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="flex flex-col gap-2">

                            <input
                                type="date"
                                disabled={
                                    !formData.excluir_periodo
                                }
                                value={
                                    formData.inativo_de
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "inativo_de",
                                        e.target.value
                                    )
                                }
                                className="
                                bg-white
                                rounded-xl
                                disabled:opacity-50
                                py-2
                                px-4
                                border-2
                                border-(--textBaseColor)/50
                            "
                            />

                            <ErroCampo erro={erros.inativo_de} />

                        </div>

                        <div className="flex flex-col gap-2">

                            <input
                                type="date"
                                disabled={
                                    !formData.excluir_periodo
                                }
                                value={
                                    formData.inativo_ate
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "inativo_ate",
                                        e.target.value
                                    )
                                }
                                className="
                                bg-white
                                rounded-xl
                                py-2
                                px-4
                                disabled:opacity-50
                                border-2
                                border-(--textBaseColor)/50
                            "
                            />

                            <ErroCampo erro={erros.inativo_ate} />

                        </div>

                    </div>

                    <div className={`flex ${isUpdate ? 'justify-between' : 'justify-end'}`}>

                        {isUpdate && (
                            <DeleteModal
                                id={String(formData.id_previdencia)}
                                action={deletePrevidenciaAction}
                                trigger={<Button
                                    className="
                            hover:cursor-pointer
                            bg-red-500
                            text-white
                            hover:bg-red-500/80
                            duration-300
                            border-none
                            mt-4
                        "
                                >
                                    Deletar
                                </Button>}
                            />
                        )}

                        <FormSubmitButton
                            pending={pending}
                            actionText={
                                isUpdate
                                    ? "Atualizar Medida"
                                    : "Criar Medida"
                            }
                            isEditMode={
                                isUpdate
                            }
                        />

                    </div>

                </form>

            </GlobalDialog>

        );

    };

export default CreateEditPrevidencia;
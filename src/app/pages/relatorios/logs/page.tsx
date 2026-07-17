import { getAllLogs } from '../../../actions/logs/logs';
import LogsDataTable from '../../../components/relatorios/logsDataTable';

export default async function Logs() {
    const logs = await getAllLogs();

    return (
        <section className="mx-8">
            <h1 className="font-bold mb-4">Logs do sistema</h1>

            <LogsDataTable logs={logs} />
        </section>
    );
}

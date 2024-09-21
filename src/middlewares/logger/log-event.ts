import { Logtail } from "@logtail/node";
import { env } from "../../../env";
import type { EventData, Severity } from "../../lib/errors";

export const logtail = env.LOGTAIL_TOKEN
	? new Logtail(env.LOGTAIL_TOKEN, {})
	: undefined;

export const logEvent = (
	message: string,
	eventData?: EventData,
	severity: Severity = "info",
) => {
	if (eventData) {
		console[severity](message, eventData);
		if (logtail) logtail[severity](message, undefined, eventData);
	} else {
		console[severity](message);
		if (logtail) logtail[severity](message);
	}
};

import CLILoggerService from '@/services/cli-logger';
import { withCleanObject } from '@/utils/object';
import { validateBoolean, validateInteger, validateString } from '@/validators/basic';
import { validateSringsArray, validateStringsObject } from '@/validators/complex';
import { validateBail } from '@/validators/bail';
import { validateFormat } from '@/validators/format';
import { ISourceConfiguration } from '@/interfaces/configuration';

import { validateRules } from './rule';

export const validateConfiguration = (configuration: ISourceConfiguration) => {
	try {
		const finalConfiguration = withCleanObject<ISourceConfiguration>({
			extends: validateString(configuration.extends, 'Must provide a string value "extends"'),
			rules: validateRules(configuration.rules),
			aliases: validateStringsObject(configuration.aliases, 'Must provide a valid value to "aliases"'),
			ignoreFilePath: validateString(
				configuration.ignoreFilePath,
				'Must provide a string value to "ignoreFilePath"',
			),
			ignore: validateBoolean(configuration.ignore, 'Must provide a boolean value to "ignore"'),
			ignorePatterns: validateSringsArray(configuration.ignorePatterns),
			quiet: validateBoolean(configuration.quiet, 'Must provide a boolean value to "quiet"'),
			maxWarnings: validateInteger(
				configuration.maxWarnings,
				'Must provide a valid number value to "maxWarnings"',
			),
			bail: validateBail(
				configuration.bail,
				'Must provide >=0 safe integer or boolean value to "--bail"',
			),
			outputFilePath: validateString(
				configuration.outputFilePath,
				'Must provide a string value to "outputFilePath"',
			),
			format: validateFormat(configuration.format, 'Must provide a valid format value to "format"'),
			color: validateBoolean(configuration.color, 'Must provide a boolean value to "color"'),
			debug: validateBoolean(configuration.debug, 'Must provide a boolean value to "debug"'),
		});

		return finalConfiguration;
	} catch (e) {
		CLILoggerService.logDefault(`${(e as Error).message}`);

		process.exit(1);
	}
};
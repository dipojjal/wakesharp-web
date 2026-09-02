/**
 * The English catalog IS the schema. Every other locale mirrors these files and
 * declares `satisfies typeof en.<file>`, so the shape below is what a translator
 * has to fill, key for key.
 */
import { shell } from './shell';
import { home } from './home';
import { support } from './support';
import { contact } from './contact';
import { accountDelete } from './account-delete';
import { share } from './share';
import { legal } from './legal';
import { notFound } from './not-found';
import { blog } from './blog';

export const en = { shell, home, support, contact, accountDelete, share, legal, notFound, blog };

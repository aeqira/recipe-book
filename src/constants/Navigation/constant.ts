/** @format */

import { parse } from 'yaml'
import type { NavigationRoute } from '@Types/Navigation'

import navigatonYaml from './navigation.yaml?raw'

export const NavigationMenu = parse(navigatonYaml) as NavigationRoute[]

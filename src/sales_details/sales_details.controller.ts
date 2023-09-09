import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesDetailsService } from './sales_details.service';

@Controller('sales-details')
export class SalesDetailsController {
  constructor(private readonly salesDetailsService: SalesDetailsService) {}

  
}

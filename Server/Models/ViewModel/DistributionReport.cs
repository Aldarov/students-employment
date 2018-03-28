using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Server.Models.University;

namespace Server.Models.ViewModel
{
    public partial class DistributionReport
    {
        public PlacementHeader Header { get; set; }
        public List<Distribution> Distributions { get; set; }
    }
}
